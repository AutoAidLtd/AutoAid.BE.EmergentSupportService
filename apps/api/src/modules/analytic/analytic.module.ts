import { Module } from "@nestjs/common";
import { AnalyticService } from "./service/analytic.service";
import { AnalyticGateway } from "./gateway/analytic.gateway";
import { PrismaModule } from "@secretlab/prisma/dist";
@Module({
  providers: [AnalyticService,AnalyticGateway],
  exports: [ AnalyticService],
  imports: [PrismaModule]
})
export class AnalyticModule {

}
