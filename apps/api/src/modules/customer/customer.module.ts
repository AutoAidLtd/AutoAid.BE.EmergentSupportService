import { Module } from "@nestjs/common";
import { PrismaModule, PrismaService } from "@secretlab/prisma/dist";
import { CustomerService } from "./service/customer.service";
import { CustomerGateway } from "./gateway/customer.gateway";


@Module({
  exports: [CustomerService],
  providers: [CustomerService, CustomerGateway],
  imports :[PrismaModule]
})
export class CustomerModule{}
