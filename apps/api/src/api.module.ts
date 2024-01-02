import { Module } from '@nestjs/common';
import { PrismaModule } from "@secretlab/prisma";
import { AccomodationModule } from 'accomodation/accomodation.module';
import { RealtimeModule } from 'realtime/realtime.module';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';


@Module({
  imports: [PrismaModule, RealtimeModule,AccomodationModule ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
