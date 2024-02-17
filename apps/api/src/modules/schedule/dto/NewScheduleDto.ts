export interface NewScheduleDto {
  vehicleId: number,
  scheduleTime: Date,
  remark?: string,
  rows : {serviceId: number}[],
  customerId: number,
  garageId: number,
}
