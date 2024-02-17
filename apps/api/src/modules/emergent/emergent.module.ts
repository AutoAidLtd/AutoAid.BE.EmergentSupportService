import { Module } from '@nestjs/common';
import { EmergentGateway } from './gateway/emergent.gateway';
import { EmergentService } from './service/emergent.service';
import { PrismaModule } from '@secretlab/prisma';
import { GarageModule } from 'modules/garage/garage.module';
import { GarageService } from 'modules/garage/service/garage.service';
import { EmergentAdminGateway } from './gateway/emergentAdmin.gateway';

@Module({
  imports:[PrismaModule, GarageModule],
  providers: [EmergentService,  EmergentGateway],
  exports: [ EmergentService]
})
export class EmergentModule {}
