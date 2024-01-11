import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';


@WebSocketGateway({cors: {
  origin: ["http://localhost:5173"],
  // allowedHeaders: "*",
  methods: ["*"]
}})
export class SocketGateway {
  @SubscribeMessage('message')
  handleMessage(client:Socket , payload: any): void {
    console.log(" socket in comming" );
    client.emit("message", "hihi response")
    console.log(client);
    console.log(payload);
  }
}
