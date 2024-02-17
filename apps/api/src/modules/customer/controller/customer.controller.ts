import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { CustomerService } from "../service/customer.service";
import { VehicleService } from "../service/vehicle.service";
import { Pageable } from "@secretlab/core";

@Controller("/customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService, private readonly vehicleService:VehicleService){}
  @Get(":id/vehicles")
  async getVehicleByUser( @Param("id", ParseIntPipe) id, @Query() query?: Pageable){

    query.pageSize = typeof query.pageSize === 'string' ? Number.parseInt(query.pageSize) : query.pageSize;
    query.page = typeof query.page === 'string' ? Number.parseInt(query.page) : query.page;
    return await this.vehicleService.getVehiclesByUser(id, query ?? {page: 1, pageSize: 20});
  }
}
