import { Module } from '@nestjs/common';
import { EmergentGateway } from './gateway/emergent.gateway';

@Module({
  imports:[],
  providers: [EmergentGateway],
  exports: [EmergentGateway]
})
export class EmergentModule {}
