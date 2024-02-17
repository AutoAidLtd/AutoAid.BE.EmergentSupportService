import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GarageService } from './service/garage.service';
import { PrismaModule } from '@secretlab/prisma/dist';
import GarageController from './controller/garage.controller';
import { ScheduleModule } from 'modules/schedule/schedule.module';
import { ScheduleService } from 'modules/schedule/service/schedule.service';

@Module({
  imports:[HttpModule.register({
    //TODO get from config garage base url
    baseURL: "http://localhost:4000"

  }),
  PrismaModule,
  ScheduleModule
],
controllers:[GarageController],
  providers: [GarageService, ScheduleService],
  exports: [GarageService]
})
export class GarageModule {}
