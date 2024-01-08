import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CommonAuthGateway } from './auth.gateway';

@Module({
  imports: [
  ],
  providers: [AuthService, JwtService, CommonAuthGateway],
  exports: [AuthService, CommonAuthGateway],
  controllers: [],
})
export class AuthModule {}
