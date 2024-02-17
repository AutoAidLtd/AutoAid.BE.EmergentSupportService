import {
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseFloatPipe,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { GarageService } from "../service/garage.service";

@Controller("/garage")
class GarageController {
  constructor(private readonly garageService: GarageService) {}

  @Get("")
  public async getGarage(
    @Query("page", ParseIntPipe) page,
    @Query("pageSize", ParseIntPipe) pageSize,
    @Query("keyword") keyword: string,
    @Query("isGetNearby", ParseBoolPipe) isGetNearby,
    @Query("lat", ParseFloatPipe) lat,
    @Query("lng", ParseFloatPipe) lng
  ) {
    return isGetNearby
      ? await this.garageService.getNearbyGarages({ lat, lng })
      : await this.garageService.getList({
          page,
          pageSize,
          keyword,
        });
  }

  // POST /garage
  public createGarage(req: Request, res: Response): void {
    // Your code here
  }

  // GET /garage/:id
  @Get(":id")
  public async getGarageById(@Param("id", ParseIntPipe) id) {
    return await this.garageService.getDetailGarage(id);
  }

  // PUT /garage/:id
  public updateGarage(req: Request, res: Response): void {
    // Your code here
  }

  // DELETE /garage/:id
  public deleteGarage(req: Request, res: Response): void {
    // Your code here
  }
}

export default GarageController;
