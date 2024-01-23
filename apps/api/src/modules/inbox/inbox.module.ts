import { Module } from "@nestjs/common";
import { ChatGateway } from "./gateway/chat.gateway";
import { ChatService } from "./service/chat.service";
import { PrismaModule } from "@secretlab/prisma/dist";

@Module({
  exports:[],
  providers : [ChatGateway, ChatService],
  imports : [PrismaModule]
})
export class InboxModule {

}
