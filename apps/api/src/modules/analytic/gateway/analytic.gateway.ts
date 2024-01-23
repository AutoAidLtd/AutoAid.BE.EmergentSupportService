import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { AnalyticEmitEvent, AnalyticReceiveEvent } from "../event/AnalyticSocketEvent";
import { Socket } from "@secretlab/socket";
import { AnalyticService } from "../service/analytic.service";
import { Inject } from "@nestjs/common";


@WebSocketGateway()
export class AnalyticGateway {
   constructor(
    @Inject(AnalyticService)
    private readonly analyticService: AnalyticService
  ) {}
  @SubscribeMessage(AnalyticReceiveEvent.ANALYTIC_AGE)
  public async analyseAge (client: Socket, payload){
      client.emit(AnalyticEmitEvent.ANALYTIC_AGE,await  this.analyticService.analyseCustomerAge())
  }
  @SubscribeMessage(AnalyticReceiveEvent.ANALYTIC_GENDER)
  public async analyseGender (client: Socket, payload){
      client.emit(AnalyticEmitEvent.ANALYTIC_GENDER,await  this.analyticService.analyseCustomerGender())
  }
}
