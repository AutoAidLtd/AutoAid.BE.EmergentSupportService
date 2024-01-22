import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { CustomerService } from "../service/customer.service";
import { Socket } from "@secretlab/socket";
import { Pageable } from "@secretlab/core";
enum CustomerAdminReceiveEvent {
  GET_LIST= "GET_LIST",
  DELETE_USER = "DEL_USER",
  DETAIL_USER = "DETAIL_USER"
}
enum CustomerAdminEmitEvent {
  GET_LIST= "GET_LIST",
  DELETE_USER = "DEL_USER",
  DETAIL_USER = "DETAIL_USER"
}

@WebSocketGateway()
export class CustomerGateway{
  constructor (private readonly customerService: CustomerService){}
  @SubscribeMessage(CustomerAdminReceiveEvent.GET_LIST)
  public async getCustomers(client: Socket, paging:Pageable){
    client.emit(CustomerAdminEmitEvent.GET_LIST, await this.customerService.getList(paging))
  }
  @SubscribeMessage(CustomerAdminReceiveEvent.DELETE_USER)
  public async deleteUser(client: Socket, id: number){
    client.emit(CustomerAdminEmitEvent.DELETE_USER, await this.customerService.delete(id))
  }
  @SubscribeMessage(CustomerAdminReceiveEvent.DELETE_USER)
  public async detail(client: Socket, id: number){
    client.emit(CustomerAdminEmitEvent.DELETE_USER, await this.customerService.getDetail(id))
  }
}
