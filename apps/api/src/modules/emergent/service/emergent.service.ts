import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "@secretlab/prisma";
import { EmergentRequestDto } from "../dto/EmergentRequestDto";
import { v4 } from "uuid";
import { Pageable, PagedList } from "@secretlab/core/dist";
import { calculateDistance } from "modules/garage/utils";

export interface IEmergentRequest {
  saveRequest: (request: EmergentRequestDto) => Promise<EmergentRequestDto>;
  getRequestByUid: (uid: string) => Promise<EmergentRequestDto>;
  getRoomOfRequest: (requestUid: string) => Promise<string>;
  updateGarageHandleRequest: (
    requestNo: number,
    garageId: number
  ) => Promise<boolean>;
}

@Injectable({})
export class EmergentService implements IEmergentRequest {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(EmergentService.name);
  async getRequestByUid(uid: string): Promise<EmergentRequestDto> {
    return await this.prisma.emergent_request
      .findFirstOrThrow({
        where: {
          uid,
        },
        include: {
          place: true,
          customer: true,
          garage: true,
        },
      })
      .then(
        async ({
          uid,
          remark,
          place: { lat, lng },
          created_date,
          customer_id,
          garage_id,
          room_uid,
          emergent_request_id,
          vehicle_meta,
           garage,
           customer
        }) => {
          const placeGarage = (await this.prisma.garage.findFirst({
            where: {
              garage_id
            },
            include: {
              place : true,
            }
          }))?.place
          let vehicle = null;
          try {
            if(vehicle_meta){
              vehicle = JSON.parse(vehicle_meta)
            }
          } catch (error) {
          }
          return {
            uid,
            remark,
            location: {
              lat,
              lng,
            },
            create_timestamp: created_date,
            no: emergent_request_id,
            room_uid,
            garage_id,
            customer_id,
            vehicle,
            distance : placeGarage ? calculateDistance({...placeGarage}, {lat, lng} ): 0,
            garage,
            customer,
          };
        }
      );
  }
  getAll(): Promise<any> {
    return this.prisma.emergent_request.findMany();
  }
  async updateGarageHandleRequest(
    requestNo: number,
    garageId: number
  ): Promise<boolean> {
    return !!(await this.prisma.emergent_request.update({
      data: {
        garage_id: garageId,
      },
      where: {
        emergent_request_id: requestNo,
      },
    }));
  }
  async getRoomOfRequest(requestUid: string): Promise<string> {
    return await this.prisma.emergent_request
      .findFirstOrThrow({
        where: {
          uid: requestUid,
        },
      })
      .then((request) => {
        if (request) {
          return request.uid;
        } else {
          return null;
        }
      });
  }

  async saveRequest(requestDto: EmergentRequestDto) {
    try {
      const persistedRequest = await this.prisma.$transaction(async (tx) => {
        requestDto.customer_id =  (await tx.customer.findFirstOrThrow({where: {
          account_id: requestDto.customer_id
        }})).customer_id
        const persistedPlace = tx.place.create({
          data: {
            lat: requestDto.location.lat,
            lng: requestDto.location.lng,
            created_user: 1,
            updated_user: 1,
          },
        });
        const requestUid = v4();
        const roomUid = v4();
        const request = await tx.emergent_request.create({
          data: {
            place_id: (await persistedPlace).place_id,
            customer_id: requestDto.customer_id,
            // vehicle_id: -1,
            remark: requestDto?.remark,
            vehicle_meta: JSON.stringify(requestDto.vehicle),
            created_date: new Date(),
            updated_date: new Date(),
            created_user: requestDto.customer_id,
            updated_user: requestDto.customer_id,
            uid: requestUid,
            room_uid: roomUid,
          },
        });
        const EMERGENT_REQUEST_EVENT_ID = 1;
        await tx.emergent_request_event.create({
          data: {
            emergent_request_id: request.emergent_request_id,
            event_id: EMERGENT_REQUEST_EVENT_ID,
            ts_created: new Date(),
          },
        });
        return !!request
          ? { ...requestDto, room_uid: roomUid, uid: requestUid }
          : null;
      }, {});
      return persistedRequest;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
  async getRequestsByGarage (garageId: number, pageable: Pageable){
    try {
      try {
        const DEFAULT_PAGESIZE = 20;

        const getRequestsTask = this.prisma.emergent_request.findMany({
          where: {
            garage_id: garageId,
          },
          include: {
            customer: {
              include :{
                account: true,
                vehicle: true
              }
            },
            place: true,
            garage:  true
          },
          skip: ((pageable?.page ?? 1) - 1) * (pageable?.pageSize ?? DEFAULT_PAGESIZE),
          take: (pageable?.pageSize ?? DEFAULT_PAGESIZE)
        })
        const [requests, schedulesCount] = await Promise.all([
          getRequestsTask,
          this.prisma.emergent_request.count({
            where: {
              garage_id: garageId,
            },
          }),
        ]);
        const placeGarage = (await this.prisma.garage.findFirst({
          where: {
            garage_id : garageId
          },
          include: {
            place : true
          }
        })).place
        const scheduleDtos = requests.map((entity) => {
          // const vehicle = entity?.customer?.vehicle?.find(v => v.vehicle_id === entity.vehicle_id)
          let vehicle = null;
          try {
            if(entity?.vehicle_meta){
              vehicle = JSON.parse(entity.vehicle_meta)
            }
          } catch (error) {
          }
          return ({
            ...entity,
            location: {
              lat: entity?.place?.lat,
              lng: entity?.place?.lng,
            },
            create_timestamp: entity?.created_date,
            no: entity?.emergent_request_id,
            vehicle,
            distance : calculateDistance({...placeGarage}, {...entity?.place})
          })
        }) as EmergentRequestDto[];
        pageable = {
          page: pageable?.page ?? 1,
          pageSize: pageable?.pageSize ?? DEFAULT_PAGESIZE,
          sort: pageable?.sort,
          totalItems: schedulesCount,
          totalPages: Math.ceil(schedulesCount / DEFAULT_PAGESIZE),
        };
        return {
          pagination: pageable,
          rows: scheduleDtos,
        } as PagedList<EmergentRequestDto>;

      } catch (error) {
        console.log(error);

        return null;
      }
    } catch (error) {
      throw error
    }
  }
}
