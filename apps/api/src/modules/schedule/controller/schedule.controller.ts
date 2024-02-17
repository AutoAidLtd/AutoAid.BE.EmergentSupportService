import { Body, Controller, Post } from "@nestjs/common";
import { ScheduleService } from "../service/schedule.service";
import { NewScheduleDto } from "../dto/NewScheduleDto";


@Controller("/schedule")
export class ScheduleController {
  constructor(private readonly schedulerService: ScheduleService){}
  @Post()
  async createNewSchedule(@Body() body: NewScheduleDto){
    return this.schedulerService.newSchedule(body);
  }
}
