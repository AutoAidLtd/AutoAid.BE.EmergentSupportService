import { Injectable } from '@nestjs/common';
import { PrismaService } from '@secretlab/prisma/dist';
import { AccomodationService } from 'accomodation/accomodation.service';

@Injectable()
export class ApiService {
  constructor(private readonly accoService: AccomodationService){}
   async getHello() {
     console.log("dawdaw"
    );
    await this.accoService.getAll()
    return 'Hello World!';
  }
}
