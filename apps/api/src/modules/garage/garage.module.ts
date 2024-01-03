import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GarageService } from './service/garage.service';

@Module({
  imports:[HttpModule.register({
    //TODO get from config garage base url
    baseURL: "http://localhost:4000"

  })],
  providers: [GarageService],
  exports: [GarageService]
})
export class GarageModule {}
