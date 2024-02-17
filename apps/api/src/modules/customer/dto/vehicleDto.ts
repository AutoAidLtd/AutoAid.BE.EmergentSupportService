export interface VehicleDto {
  vehicle_id: number;
  make: string;
  model: string;
  est_year: Date;
  color?: string;
  owner_id: number;
  purchase_date?: Date;
  mileage?: number;
  engine_number?: string;
  chassis_number?: string;
}
