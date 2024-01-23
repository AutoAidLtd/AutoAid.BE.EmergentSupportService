import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "@secretlab/prisma/dist";
import { ChatChannelDto } from "../dto/ChatChannelDto";



@Injectable()
export class ChatService {
  constructor (@Inject(PrismaService) private readonly prisma : PrismaService){}
  async getListChannel(accountId: number ){
    return (await this.prisma.chat_channel.findMany({
      include  :{
        participant: true
      },
      where : {
        participant: {
          some : {
            user_id : {
              equals : accountId
            }
          }
        }
      }
    })).map(channel =>  ({...channel, participant: channel.participant as any[]}) as ChatChannelDto )
  }
  async sendNewMessage ({
    senderId,
    content,
    channelId
  }: {
    senderId:number,
    content : string,
    channelId: number
  }) {
    const persistedMessage = this.prisma.message.create({
      data : {
        content,
        sender_id: senderId,
        channel_id : channelId,
        created_date: new Date(),
        updated_date : new Date()
      }
    })
  }
}
