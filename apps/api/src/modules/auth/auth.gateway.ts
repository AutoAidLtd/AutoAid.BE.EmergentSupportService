import { Inject, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Socket, SocketGateway } from '@secretlab/socket/dist';
import { AuthService } from './service/auth.service';
import ExtendedSocket from "../../types/override/socket"

declare module '@secretlab/socket' {
  interface Socket {
    user?: any; // Adjust the type of 'user' as needed
  }
}

export class CommonAuthGateway extends SocketGateway
implements OnGatewayConnection
{
  constructor(@Inject(AuthService) private readonly authService:AuthService){
    super()
  }
  private readonly logger = new Logger(CommonAuthGateway.name);
  async handleConnection(client: Socket /*or your specific client type*/) {
    try {

      const REQUEST_AUTH_HEADER_NAME = 'authorization'
      const AUTH_PREFIX = 'Bearer'
      const authHeader = client.conn.request.headers[REQUEST_AUTH_HEADER_NAME]
      if(!authHeader.startsWith(AUTH_PREFIX)) throw new Error("Not allowed")
      const token = authHeader.substring(AUTH_PREFIX.length + 1);
      // this.logger.debug(this.authService)
      const user = await this.authService.extractUser(token);
      console.log(user);
      if(!!user){
        client.user = user
      }else {
        client.disconnect(true)
      }


      // // Authenticate the client/connection here
      // const isAuthenticated = await this.authenticateClient(client);

      // if (isAuthenticated) {
    //   // Fetch user details or relevant data
    //   const userDetails = await this.getUserDetails(client);

    //   // Attach user details to the client or its context for later use
    //   client.user = userDetails;

    //   // Proceed with handling incoming WebSocket messages
    //   client.on('message', (data) => {
      //     // Handle incoming messages using user details stored in 'client.user'
    //     // Your logic here...
    //   });
    // } else {
      //   // Close the connection or handle unauthorized access
      //   client.close(/*optional message or code*/);
      // }
    } catch (error) {
      this.logger.error(error.message)
      client.disconnect(true)
    }
    }
  @SubscribeMessage('JOIN')
  async handleMessage(client: Socket, account_id: string) {
      console.log(account_id);
      console.log(client.rooms);

      await client.join(account_id)
      client.to(account_id).emit("JOIN", "connected")
    }

    @SubscribeMessage('TEST_ROOM')
    async testRoom(client: Socket, account_id: string) {
        // client.broadcast.emit("JOIN", "connected")
      // console.log(this.authService);
      console.log(client.rooms);


    }
    @SubscribeMessage('sign')
    async signTestToken(client:Socket, account_id: string){
      client.emit("sign", await this.authService.sign(account_id))
    }

}
