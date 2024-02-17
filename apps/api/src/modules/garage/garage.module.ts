import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GarageService } from './service/garage.service';
import { PrismaModule } from '@secretlab/prisma/dist';
import GarageController from './controller/garage.controller';

@Module({
  imports:[HttpModule.register({
    //TODO get from config garage base url
    baseURL: "http://localhost:4000"

  }),
  PrismaModule
],
controllers:[GarageController],
  providers: [GarageService],
  exports: [GarageService]
})
export class GarageModule {}
