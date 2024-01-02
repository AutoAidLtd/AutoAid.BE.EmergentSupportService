import { Inject, Injectable, Scope } from '@nestjs/common';
import { PrismaService } from '@secretlab/prisma/dist';

@Injectable({
  // scope:Scope.REQUEST
})
export class AccomodationService {
  constructor(@Inject(PrismaService) private readonly prisma:PrismaService){}
  getAll():Promise<any>{
    return this.prisma.accomodation.findMany();
  }
}
