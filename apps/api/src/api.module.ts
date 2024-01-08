import { Module } from '@nestjs/common';
import { PrismaModule } from "@secretlab/prisma";
import { RealtimeModule } from 'realtime/realtime.module';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { GarageModule } from 'modules/garage/garage.module';
import { EmergentModule } from 'modules/emergent/emergent.module';
import { JwtModule } from '@nestjs/jwt';



@Module({
  imports: [
    PrismaModule, RealtimeModule, GarageModule,EmergentModule,
    JwtModule.register({secret: "secret-lab-12312312312312"})
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
