import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { Coordinate } from "../dto/coordinate.dto";
import { PrismaService } from "@secretlab/prisma/dist";
import { calculateDistance } from "../utils";
import { GarageDto } from "../dto/garageDto";
import { PagedList, Pageable } from "@secretlab/core";

export interface IGarageService {
  getNearbyGarages: (coordinate: Coordinate) => Promise<GarageDto[]>;
  getList: (paging: Pageable) => Promise<PagedList<GarageDto>>;
}

@Injectable({})
export class GarageService implements IGarageService {
  public constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService
  ) {}
  public async getNearbyGarages(coordinate: Coordinate): Promise<GarageDto[]> {
    try {
      const TARGET_NUMBER_GARAGES_FOUND = 10;
      const GARAGE_SCALE_KILOMETER = 10;
      const garages = await this.prisma.garage.findMany({
        include: {
          place: true,
        },
      });
      garages.forEach(g=>{
        console.log({
          dist:  calculateDistance(coordinate, g.place)
        });
      })
      let nearGarages = garages;
      return nearGarages.map((e) => ({ ...e }));
    } catch (error) {
      // Handle the error here
      return null
    }
  }
  async getList(paging: Pageable) {
    const DEFAULT_PAGESIZE = 20;

    // const [_, records] = await this.prisma.$transaction([
    //     this.prisma.$executeRawUnsafe<any>(`
    //     CALL app.place_get_all(4);
    //   `),
    //     this.prisma.$queryRawUnsafe<any>(`
    //       FETCH ALL FROM p_result;
    //   `)
    // ])
    // console.log(records);

    const getGarageTask = this.prisma.$queryRaw<GarageDto[]>`

     SELECT g.*, p.lat, p.lng
      -- a.username as ownerName,
      -- a.email as ownerEmail,
      -- a.phone_number as ownerPhone
      FROM app.garage g
      LEFT JOIN app.place p ON g.place_id = p.place_id
      -- LEFT JOin ids.account a ON g.owner_id = a.account_id
      LIMIT ${paging?.pageSize ?? DEFAULT_PAGESIZE}
      OFFSET ${
        ((paging?.page ?? 1) - 1) * (paging?.pageSize ?? DEFAULT_PAGESIZE)
      }
    `;
    const [garages, garageCount] = await Promise.all([
      getGarageTask,
      this.prisma.garage.count(),
    ]);
    const garageDtos = garages.map((entity: any) => ({
      ...entity,
      lat: entity.lat,
      lng: entity.lng,
    })) as GarageDto[];
    paging = {
      page: paging?.page ?? 1,
      pageSize: paging?.pageSize ?? DEFAULT_PAGESIZE,
      sort: paging?.sort,
      totalItems: garageCount,
      totalPages: Math.ceil(garageCount / DEFAULT_PAGESIZE),
    };
    return {
      pagination: paging,
      rows: garageDtos,
    } as PagedList<GarageDto>;
  }
}
