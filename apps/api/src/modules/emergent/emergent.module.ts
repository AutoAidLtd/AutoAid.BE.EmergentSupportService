import { Module } from '@nestjs/common';
import { EmergentGateway } from './gateway/emergent.gateway';
import { EmergentService } from './service/emergent.service';
import { PrismaModule } from '@secretlab/prisma/dist';

@Module({
  imports:[PrismaModule],
  providers: [EmergentGateway, EmergentService],
  exports: [EmergentGateway, EmergentService]
})
export class EmergentModule {}
