import { Injectable } from '@nestjs/common';
import { PrismaService } from '@secretlab/prisma';

@Injectable()
export class ApiService {
  constructor(){}
   async getHello() {
     console.log("dawdaw"
    );
    return 'Hello World!';
  }
}
