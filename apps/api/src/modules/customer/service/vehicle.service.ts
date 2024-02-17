import { Injectable } from "@nestjs/common";
import { Pageable, PagedList } from "@secretlab/core/dist";
import { PrismaService } from "@secretlab/prisma/dist";
import { VehicleDto } from "../dto/vehicleDto";

@Injectable()
export class VehicleService {
  public constructor (private readonly prisma :  PrismaService){}
  async getVehiclesByUser(id: number, pagable?: Pageable){
    try {

      const DEFAULT_PAGESIZE = 20;

    const getGarageTask = this.prisma.vehicle.findMany({
      where: {
        owner_id: id
      },
      skip: ((pagable?.page ?? 1) - 1) * (pagable?.pageSize ?? DEFAULT_PAGESIZE),
      take: (pagable?.pageSize ?? DEFAULT_PAGESIZE)
    })
    const [vehicles, garageCount] = await Promise.all([
      getGarageTask,
      this.prisma.vehicle.count({
        where: {
          owner_id: id
        },
      }),
    ]);

    const garageDtos = vehicles.map((entity: any) => ({
      ...entity,

    })) as VehicleDto[];
    pagable = {
      page: pagable?.page ?? 1,
      pageSize: pagable?.pageSize ?? DEFAULT_PAGESIZE,
      sort: pagable?.sort,
      totalItems: garageCount,
      totalPages: Math.ceil(garageCount / DEFAULT_PAGESIZE),
    };
    return {
      pagination: pagable,
      rows: garageDtos,
    } as PagedList<VehicleDto>;

    } catch (error) {
      throw error
    }
  }
}
