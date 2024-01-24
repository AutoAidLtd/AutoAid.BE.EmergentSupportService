import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { DashboardService } from "../sevice/dashboard.service";
import { DashboardEmittingEvents, DashboardReceivingEvents } from "../event/DashboardSocketEvent";
import { Socket } from "@secretlab/socket";


@WebSocketGateway()
export class DashboardGateway {
  constructor(private readonly dashboardService: DashboardService){}

  @SubscribeMessage(DashboardReceivingEvents.ACTIVE_USERS)
  async getActiveUsers(client: Socket, payload){
    client.emit(DashboardEmittingEvents.ACTIVE_USERS, await this.dashboardService.getUsersCurrentMonth())
  }

}
