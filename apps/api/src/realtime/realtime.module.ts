import { Module } from '@nestjs/common';
import { RealtimeGateway } from './realtime.gateway';
import { PrismaModule, PrismaService } from '@secretlab/prisma';
import { AccomodationModule } from 'accomodation/accomodation.module';
import { AccomodationService } from 'accomodation/accomodation.service';

@Module({
  imports:[AccomodationModule],
  providers: [RealtimeGateway],
  exports: [RealtimeGateway]
})
export class RealtimeModule {}
