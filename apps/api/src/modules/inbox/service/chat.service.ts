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
  async retrieveOrCreateChannel({targetIds}: {targetIds: number[],}){
    try {
      var channel =  (await this.prisma.chat_channel.findFirst({
        include  :{
          participant: true
        },
        where : {
          participant: {
            some : {
              user_id : {
                in: targetIds
              }
            }
          }
        }
      }))
      if(!channel){
        channel = await this.createChannel(targetIds);
      }
      return channel;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async createChannel(participantIds?:number[]){
    try {

    const createChannelResult = await this.prisma.$transaction(async(tx)=>{
      const newChannel = await tx.chat_channel.create({
        data: {
          channel_name:"",
          created_date: new Date(),
          updated_date: new Date()
        }
      });
      if(participantIds?.length > 0 && !!newChannel){
        const createParticipantTasks =  await tx.participant.createMany({
          data: participantIds.map(pid => ({
            channel_id: newChannel.channel_id,
            joined_date: new Date(),
            updated_date: new Date(),
            user_id: pid
          }))
        })
      }
      return newChannel

    })

  } catch (error) {
   console.log(error);
      return null;
  }
  }
}
