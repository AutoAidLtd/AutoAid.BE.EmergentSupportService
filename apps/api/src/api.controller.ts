import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiService } from './api.service';
import {PrismaService} from "@secretlab/prisma"
import { GarageService } from 'modules/garage/service/garage.service';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService,
        private readonly garageService: GarageService
    ) {}

  @Get()
  async getHello(@Query('page') page) {
    console.log({page});

    return await this.apiService.getHello();
  }

}
