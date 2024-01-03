import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "@secretlab/prisma"
import { EmergentRequestDto } from "../dto/EmergentRequestDto";


@Injectable()
export class EmergentService {
  constructor(@Inject(PrismaService) private readonly prisma:PrismaService){}
  getAll():Promise<any>{
    return this.prisma.accomodation.findMany();
  }
  saveData(){
    const accommodation =  this.prisma.accomodation.create({
      data: {

      } as any
    })
    const accommodationDto= {}
    Object.assign(accommodationDto,accommodation)
    return accommodationDto
  }

  handleRequestIncoming(request: EmergentRequestDto) {

  }
}

