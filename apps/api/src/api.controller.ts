import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';
import {PrismaService} from "@secretlab/prisma"

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  async getHello() {
    return await this.apiService.getHello();
  }
}
