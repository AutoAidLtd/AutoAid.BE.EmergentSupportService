import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "@secretlab/prisma";
import { EmergentRequestDto } from "../dto/EmergentRequestDto";
import { v4 } from "uuid";

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
        async({

          uid,
          remark,
          place: { lat, lng },
          created_date,
          customer_id,
          garage_id,
          room_uid,
          emergent_request_id,
        }) => {
          const EMERGENT_REQUEST_EVENT_ID = 1;
          await this.prisma.emergent_request_event.create({
            data: {
              emergent_request_id: emergent_request_id,
              event_id: EMERGENT_REQUEST_EVENT_ID,
              ts_created : new Date()
            }
          })
          return ({
            uid,
            remark,
            location: {
              lat,
              lng,
            },
            create_timestamp: created_date,
            room_uid,
            no: emergent_request_id,
            garage_id,
            customer_id
          })
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
        const persistedPlace = tx.place.create({
          data: {
            lat: requestDto.location.lat,
            lng: requestDto.location.lng,
            created_user: 1,
            updated_user: 1,
          },
        });
        const requestUid = v4()
        const roomUid = v4()
        const request = await tx.emergent_request.create({
          data: {
            place_id: (await persistedPlace).place_id,
            customer_id: requestDto.customer_id,
            // vehicle_id: -1,
            created_date: new Date(),
            updated_date: new Date(),
            created_user: requestDto.customer_id,
            updated_user: requestDto.customer_id,
            uid: requestUid,
            room_uid: roomUid,
          },
        });
        return !!request ? {...requestDto,
          room_uid:roomUid,
          uid: requestUid,
        } : null;
      }, {});
      return persistedRequest
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
