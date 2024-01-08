import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { Coordinate } from "../dto/coordinate.dto";
import { PrismaService } from "@secretlab/prisma/dist";
import { calculateDistance } from "../utils";

@Injectable()
export class GarageService {
  public constructor(
    private readonly httpService: HttpService,
    @Inject(PrismaService) private readonly prisma: PrismaService
  ) {}
  public async getNearbyGarages(coordinate: Coordinate) {
    try {
      const TARGET_NUMBER_GARAGES_FOUND = 10;
      const GARAGE_SCALE_KILOMETER = 10;
      const garages = await this.prisma.garage.findMany({
        include: {
          place: true,
        },
      });
      let nearGarages = garages.filter(g => calculateDistance(coordinate, g.place) <= TARGET_NUMBER_GARAGES_FOUND)
      return nearGarages;
    } catch (error) {
      // Handle the error here
    }
  }
}
