import { Module } from '@nestjs/common';
import { HttpService } from './http.service';
import {} from "@nestjs/axios"

@Module({
  imports: [],
  providers: [HttpService],
  exports: [HttpService],
})
export class HttpModule {}
