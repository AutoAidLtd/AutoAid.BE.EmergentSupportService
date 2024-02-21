import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GarageService } from './service/garage.service';
import { PrismaModule } from '@secretlab/prisma';
import GarageController from './controller/garage.controller';
import { ScheduleModule } from 'modules/schedule/schedule.module';
import { ScheduleService } from 'modules/schedule/service/schedule.service';
import { EmergentModule } from 'modules/emergent/emergent.module';
import { EmergentService } from 'modules/emergent/service/emergent.service';

@Module({
  imports:[HttpModule.register({
    //TODO get from config garage base url
    baseURL: "http://localhost:4000"

  }),
  PrismaModule,
  ScheduleModule,
  // EmergentModule
],
controllers:[GarageController],
  providers: [GarageService, ScheduleService, EmergentService],
  exports: [GarageService]
})
export class GarageModule {}
