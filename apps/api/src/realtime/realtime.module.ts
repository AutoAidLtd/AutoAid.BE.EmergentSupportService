import { Module } from '@nestjs/common';
import { RealtimeGateway } from './realtime.gateway';
import { PrismaModule, PrismaService } from '@secretlab/prisma';
import { GarageModule } from 'modules/garage/garage.module';
import { GarageService } from 'modules/garage/service/garage.service';

@Module({
  imports:[GarageModule],
  providers: [RealtimeGateway],
  exports: [RealtimeGateway]
})
export class RealtimeModule {}
