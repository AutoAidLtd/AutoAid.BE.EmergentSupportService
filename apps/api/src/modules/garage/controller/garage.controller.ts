import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseFloatPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { GarageService } from "../service/garage.service";
import { ScheduleService } from "modules/schedule/service/schedule.service";
import { ScheduleStatus } from "modules/schedule/dto/enum/scheduleStatus";

@Controller("/garage")
class GarageController {
  constructor(
    private readonly garageService: GarageService,
    private readonly scheduleService: ScheduleService
  ) {}

  @Get("")
  public async getGarage(
    @Query("page", ParseIntPipe) page,
    @Query("pageSize", ParseIntPipe) pageSize,
    @Query("keyword") keyword: string,
    @Query("isGetNearby") isGetNearby,
    @Query("lat") lat?,
    @Query("lng") lng?
  ) {
    return isGetNearby
      ? await this.garageService.getNearbyGarages({
          lat: Number.parseInt(lat),
          lng: Number.parseInt(lng),
        })
      : await this.garageService.getList({
          page,
          pageSize,
          keyword,
        });
  }
  @Get(":id/schedules")
  public async getGarageSchedules(
    @Param("id", ParseIntPipe) id,
    @Query("status") status: ScheduleStatus,
    @Query("page", ParseIntPipe) page?,
    @Query("pageSize", ParseIntPipe) pageSize?,
  ) {
    return await this.scheduleService.getGarageSchedules(id, {
      page: page ?? 1,
      pageSize: pageSize ?? 20,
    }, status);
  }

  // POST /garage
  public createGarage(req: Request, res: Response): void {
    // Your code here
  }

  @Put("/schedules")
  public async approveSchedule(@Body() {scheduleId, status} : { scheduleId: number, status: ScheduleStatus}){
    return await this.scheduleService.updateStatusSchedule(scheduleId, status)
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
