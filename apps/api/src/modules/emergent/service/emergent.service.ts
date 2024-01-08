import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "@secretlab/prisma"
import { EmergentRequestDto } from "../dto/EmergentRequestDto";
import {v4} from "uuid"

export interface IEmergentRequest {
  saveRequest : (request :EmergentRequestDto) => Promise<EmergentRequestDto>
  getRequestByUid: (uid: string) => Promise<EmergentRequestDto>
  getRoomOfRequest: (requestUid: string) => Promise<string>
  updateGarageHandleRequest: (requestNo: number, garageId: number) => Promise<boolean>
}

@Injectable()
export class EmergentService implements IEmergentRequest {
  constructor(@Inject(PrismaService) private readonly prisma:PrismaService){}
  async getRequestByUid (uid: string):Promise<EmergentRequestDto> {
    return await this.prisma.emergent_request.findFirstOrThrow({
      where: {
        uid
      },
       include : {
        place:  true,
        customer: true,
        garage: true,
       }
    }).then((({uid, remark, place: {lat, lng}, created_date, customer_id, garage_id, room_uid,emergent_request_id }) => ({
        uid,
        remark,
        location: {
          lat,
          lng
        },
        create_timestamp: created_date,
        room_uid,
        no: emergent_request_id,
        garage_id
      })))
  };
  getAll():Promise<any>{
    return this.prisma.emergent_request.findMany();
  }
  async updateGarageHandleRequest (requestNo: number, garageId: number) : Promise<boolean>{
    return !!(await this.prisma.emergent_request.update({
      data: {
        garage_id : garageId
      },
      where :{
        emergent_request_id:requestNo
      }
    }))
  }
  async getRoomOfRequest (requestUid: string):Promise<string> {
    return await this.prisma.emergent_request.findFirstOrThrow({
      where:  {
        uid : requestUid
      }
    }).then(request => {
      if(request){
        return request.uid
      }else {
        return null;
      }
    })
  }
  async saveRequest(requestDto: EmergentRequestDto){

    const requestId = await  this.prisma.$transaction(async (tx)=> {

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
          vehicle_id: -1,
          created_date:  new Date(),
          updated_date: new Date(),
          created_user: -1 ,
          updated_user: -1,
          uid : v4(),
          room_uid: v4()
        }
      })
      return request.uid
    },{
    })
    if(!!requestId) {
      requestDto.uid = requestId
      return requestDto
    }
    return null
  }

}
