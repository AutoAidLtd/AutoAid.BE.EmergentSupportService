import { Module } from '@nestjs/common';
import { PrismaModule } from "@secretlab/prisma";
import { RealtimeModule } from 'realtime/realtime.module';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { GarageModule } from 'modules/garage/garage.module';
import { EmergentModule } from 'modules/emergent/emergent.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from 'modules/auth/auth.module';
import { CustomerModule } from 'modules/customer/customer.module';
import { DashboardModule } from 'modules/dashboard/dashboard.module';
import { AnalyticGateway } from 'modules/analytic/gateway/analytic.gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AnalyticModule } from 'modules/analytic/analytic.module';


@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal:true,
      prismaServiceOptions: {
        prismaOptions: {
          log: ['query', 'info', 'warn', 'error'],
        }
      }
    }),
    RealtimeModule,
    GarageModule,
    EmergentModule,
    CustomerModule,
    DashboardModule,
    AnalyticModule,
    ConfigModule.forRoot({ isGlobal: true, load: [] }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<any>('security');
        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: securityConfig?.expiresIn ?? 3600 * 24,
          },
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [ApiController],
  providers: [ApiService, AuthGuard, JwtService],
})
export class ApiModule {}
