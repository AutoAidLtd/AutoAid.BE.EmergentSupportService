import { Module } from "@nestjs/common";
import { DashboardService } from "./sevice/dashboard.service";
import { DashboardGateway } from "./gateway/dashboard.gateway";

@Module({
  exports: [DashboardGateway],
  imports: [],
  providers: [DashboardService, DashboardGateway]
})
export  class DashboardModule {

}
