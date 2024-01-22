import { Module } from "@nestjs/common";
import { AnalyticService } from "./service/analytic.service";
import { AnalyticGateway } from "./gateway/analytic.gateway";

@Module({
  exports: [AnalyticGateway, AnalyticService],
  imports: [],
  providers: [AnalyticService,AnalyticGateway]
})
export class AnalyticModule {

}
