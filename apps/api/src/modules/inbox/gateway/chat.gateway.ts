import { WebSocketGateway } from "@nestjs/websockets";
import { ChatService } from "../service/chat.service";

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService:ChatService){}
}
