import { GarageServiceDto } from "modules/garage/dto/garageServiceDto";

export interface ServiceScheduleDto {
  service_schedule_id: number;
  created_date: Date;
  updated_date: Date;
  created_user: number;
  updated_user: number;
  is_deleted: boolean;
  vehicle_id: number;
  check_in_time: Date;
  check_out_time: Date;
  description?: string;
  price?: number;
  garage_id: number;
  service_schedule_status: string;
  schedule_detail: ScheduleDetailDto[];
}

export interface ScheduleDetailDto {
  schedule_detail_id: number;
  is_deleted: boolean;
  schedule_id: number;
  service_id: number;
  garage_service: GarageServiceDto;
}

