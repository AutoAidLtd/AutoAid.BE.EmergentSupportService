import { Module } from '@nestjs/common';
import { PrismaModule } from "@secretlab/prisma";
import { AccomodationModule } from 'accomodation/accomodation.module';
import { RealtimeModule } from 'realtime/realtime.module';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { GarageModule } from 'modules/garage/garage.module';
import { EmergentModule } from 'modules/emergent/emergent.module';



@Module({
  imports: [PrismaModule, RealtimeModule,AccomodationModule, GarageModule,EmergentModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
