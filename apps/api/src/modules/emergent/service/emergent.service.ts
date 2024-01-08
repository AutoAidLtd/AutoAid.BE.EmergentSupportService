import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "@secretlab/prisma"
import { EmergentRequestDto } from "../dto/EmergentRequestDto";


@Injectable()
export class EmergentService {
  constructor(@Inject(PrismaService) private readonly prisma:PrismaService){}
  getAll():Promise<any>{
    return this.prisma.emergent_request.findMany();
  }
  saveData(requestDto: EmergentRequestDto){

    const request = this.prisma.$transaction(async (tx)=> {

      const persistedPlace = tx.place.create({
        data :{
          lat: requestDto.location.lat,
          lng: requestDto.location.lng,
          created_user: -1,
          updated_user: -1
        }
      })
      const request = await tx.emergent_request.create({
        data: {
          place_id: (await persistedPlace).place_id,
          customer_id: -1,

        }
      })
      return request
    },{
    })

    return request
  }

  handleRequestIncoming(request: EmergentRequestDto) {

  }
}

