import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Inject, Pageable } from "@secretlab/core";
import { Socket } from "@secretlab/socket";
import { GarageService } from "modules/garage/service/garage.service";

@WebSocketGateway({cors: {
  origin: ["http://localhost:5173"],
  allowedHeaders: "*",
  methods: "*"
}})
export class EmergentAdminGateway {
  constructor(@Inject(GarageService)private readonly garageService: GarageService){}

  @SubscribeMessage("GARAGE_ADMIN_LIST")
  async getList(client: Socket, paging: Pageable) {
    client.emit("GARAGE_ADMIN_LIST",await this.garageService.getList(paging))
  }
}
