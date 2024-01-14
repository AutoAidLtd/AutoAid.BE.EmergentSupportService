import { Module } from '@nestjs/common';
import { EmergentGateway } from './gateway/emergent.gateway';
import { EmergentService } from './service/emergent.service';
import { PrismaModule } from '@secretlab/prisma/dist';
import { GarageModule } from 'modules/garage/garage.module';
import { GarageService } from 'modules/garage/service/garage.service';
import { EmergentAdminGateway } from './gateway/emergent.admin.gateway';

@Module({
  imports:[PrismaModule, GarageModule],
  providers: [EmergentService,  EmergentGateway, EmergentAdminGateway ],
  exports: [ EmergentService]
})
export class EmergentModule {}
