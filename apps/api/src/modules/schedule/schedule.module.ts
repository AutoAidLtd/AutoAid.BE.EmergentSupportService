import { Module } from "@nestjs/common";
import { PrismaModule } from "@secretlab/prisma/dist";
import { ScheduleService } from "./service/schedule.service";
import { ScheduleController } from "./controller/schedule.controller";


@Module({
  exports: [ScheduleService],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  imports : [PrismaModule]
})
export class ScheduleModule {

}
