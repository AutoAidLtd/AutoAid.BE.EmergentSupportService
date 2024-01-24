import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { ChatService } from "../service/chat.service";
import { ChatSocketReceivingEvent } from "../event/ChatSocketEvent";
import { Socket } from "@secretlab/socket";
import { isEmpty } from "lodash";
@WebSocketGateway()
export class ChatGateway {
  private readonly CHAT_ROOM_PREFIX = "CHAT_ROOM_"
  constructor(private readonly chatService:ChatService){}
  @SubscribeMessage(ChatSocketReceivingEvent.CUSTOMER_START_CHAT_WITH_ADMIN)
  async customerStartChatAdmin(client: Socket, payload ){

    const chatChannel = await this.chatService.retrieveOrCreateChannel({targetIds: [0, 8]})
    client.emit(ChatSocketReceivingEvent.CUSTOMER_START_CHAT_WITH_ADMIN, chatChannel)
  }
  @SubscribeMessage(ChatSocketReceivingEvent.GET_LIST_CHANNEL)
  async getListChannel(client: Socket, payload: {accountId:number} ){

    if(isEmpty(payload) || payload?.accountId === undefined) {
      client.emit(ChatSocketReceivingEvent.GET_LIST_CHANNEL, {error : "Please provide account Id"})
      return
    }
    const channels = await this.chatService.getListChannel(payload.accountId)
    client.emit(ChatSocketReceivingEvent.GET_LIST_CHANNEL, channels)
  }
  @SubscribeMessage(ChatSocketReceivingEvent.LISTEN_INBOX)
  async listenInbox(client: Socket, payload: {accountId:number} ){

    if(isEmpty(payload) || payload?.accountId === undefined) {
      client.emit(ChatSocketReceivingEvent.LISTEN_INBOX, {error : "Please provide account Id"})
      return
    }
    const channels = await this.chatService.getListChannel(payload.accountId)
    console.log({room : channels.map(channel => `${this.CHAT_ROOM_PREFIX}${channel.channel_id}`)});

    client.join(channels.map(channel => `${this.CHAT_ROOM_PREFIX}${channel.channel_id}`))
    client.emit(ChatSocketReceivingEvent.LISTEN_INBOX, true)
  }
  @SubscribeMessage(ChatSocketReceivingEvent.MESSAGE)
  async message(client: Socket, payload: {channelId: number, content: string, accountId: number} ){

    if(isEmpty(payload) || payload?.channelId === undefined) {
      client.emit(ChatSocketReceivingEvent.LISTEN_INBOX, {error : "Please provide account Id"})
      return
    }
    if(!payload?.content ) return;
//TODO: check valid account in channel can send message
    client.in(`${this.CHAT_ROOM_PREFIX}${payload?.channelId}`).emit("MESSAGE", {...payload})
  }

}
