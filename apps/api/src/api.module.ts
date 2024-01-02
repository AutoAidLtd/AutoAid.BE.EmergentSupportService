import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import {PrismaModule, PrismaService} from "@secretlab/prisma"
import { SocketModule } from '@secretlab/socket';
import { RealtimeModule } from 'realtime/realtime.module';
import { AccomodationService } from './accomodation/accomodation.service';
import { AccomodationModule } from 'accomodation/accomodation.module';


@Module({
  imports: [PrismaModule, RealtimeModule,AccomodationModule ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
