import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Inject, Pageable } from "@secretlab/core/dist";
import { Socket } from "@secretlab/socket";
import { GarageService } from "modules/garage/service/garage.service";

@WebSocketGateway()
export class EmergentAdminGateway {
  public constructor(@Inject(GarageService)private readonly garageService: GarageService){}
  @SubscribeMessage("GARAGE_ADMIN_LIST")
  public async getList(client: Socket, paging: Pageable) {
    client.emit("GARAGE_ADMIN_LIST",await this.garageService.getList(paging))
  }
}
