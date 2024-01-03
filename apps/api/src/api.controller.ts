import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';
import {PrismaService} from "@secretlab/prisma"
import { GarageService } from 'modules/garage/service/garage.service';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService,
        private readonly garageService: GarageService
    ) {}

  @Get()
  async getHello() {
    return await this.apiService.getHello();
  }
  @Get("/garage")
  async testGarageEndpoint() {
    return await this.garageService.getNearbyGarages({} as any);
  }
}
