import { Injectable } from "@nestjs/common";
import { PrismaService } from "@secretlab/prisma/dist";
import { NewScheduleDto } from "../dto/NewScheduleDto";
import { ScheduleStatus } from "../dto/enum/scheduleStatus";
import { Pageable, PagedList } from "@secretlab/core/dist";
import { ScheduleDetailDto, ServiceScheduleDto } from "../dto/serviceScheduleDto";

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}
  async newSchedule(payload: NewScheduleDto) {
    try {
      const tx = await this.prisma.$transaction(async (tx) => {
        const persistedNewSchedule = await tx.service_schedule.create({
          data: {
            check_in_time: payload?.scheduleTime ?? new Date(),
            check_out_time: new Date(),
            created_user: payload?.customerId,
            service_schedule_status: ScheduleStatus.PENDING,
            updated_user: payload?.customerId,
            garage_id: payload.garageId,
            description: payload?.remark,
            vehicle_id: payload?.vehicleId,
          },
        });
        const persistedScheduleDetails = await tx.schedule_detail.createMany({
          data: payload?.rows?.map((row) => ({
            schedule_id: persistedNewSchedule.service_schedule_id,
            service_id: row.serviceId,
          })),
        });
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async updateStatusSchedule(scheduleId: number ,status: ScheduleStatus){
    try {
      await this.prisma.service_schedule.update({
        data: {service_schedule_status : status},
        where: {
          service_schedule_id : scheduleId
        }
      })
      return true
    } catch (error) {
      return false
    }
  }
  async getGarageSchedules (garageId : number, pageable: Pageable, status?: ScheduleStatus){
    try {
      const DEFAULT_PAGESIZE = 20;

      const getSchedulesTask = this.prisma.service_schedule.findMany({
        where: {
          garage_id: garageId,
          ...(status?{
            service_schedule_status: status
          } :{})
        },
        include: {
          schedule_detail: {
            include : {
              garage_service : true
            }
          }
        },

        skip: ((pageable?.page ?? 1) - 1) * (pageable?.pageSize ?? DEFAULT_PAGESIZE),
        take: (pageable?.pageSize ?? DEFAULT_PAGESIZE)
      })
      const [schedules, schedulesCount] = await Promise.all([
        getSchedulesTask,
        this.prisma.service_schedule.count({
          where: {
            garage_id: garageId,
            ...(status?{
              service_schedule_status: status
            } :{})
          },
        }),
      ]);

      const scheduleDtos = schedules.map((entity) => ({
        ...entity,
        schedule_detail : entity.schedule_detail.map(sd => ({
          ...sd,
          garage_service: {
            ...sd.garage_service,
            price: sd.garage_service.price?.toNumber()
          }
        }) as ScheduleDetailDto),
        price: entity.price?.toNumber(),
      })) as ServiceScheduleDto[];
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
      } as PagedList<ServiceScheduleDto>;

    } catch (error) {
      console.log(error);

      return null;
    }
  }
}
