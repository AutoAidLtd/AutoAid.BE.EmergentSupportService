import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { CustomerService } from "../service/customer.service";
import { Socket } from "@secretlab/socket";
import { Pageable } from "@secretlab/core";
enum CustomerAdminReceiveEvent {
  GET_LIST= "GET_LIST"
}
enum CustomerAdminEmitEvent {
  GET_LIST= "GET_LIST"
}

@WebSocketGateway()
export class CustomerGateway{
  constructor (private readonly customerService: CustomerService){}
  @SubscribeMessage(CustomerAdminReceiveEvent.GET_LIST)
  public async getCustomers(client: Socket, paging:Pageable){
    client.emit(CustomerAdminEmitEvent.GET_LIST, await this.customerService.getList(paging))
  }
}
