import { Module } from "@nestjs/common";
import { PrismaModule, PrismaService } from "@secretlab/prisma/dist";
import { CustomerService } from "./service/customer.service";
import { CustomerGateway } from "./gateway/customer.gateway";
import { CustomerController } from "./controller/customer.controller";
import { VehicleService } from "./service/vehicle.service";


@Module({
  exports: [CustomerService, VehicleService],
  providers: [CustomerService, VehicleService, CustomerGateway],
  controllers: [CustomerController],
  imports :[PrismaModule]
})
export class CustomerModule{}
