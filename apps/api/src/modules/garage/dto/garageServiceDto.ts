export interface GarageServiceDto {
  garage_service_id: number;
  created_date: Date;
  updated_date: Date;
  created_user: number;
  updated_user: number;
  is_deleted: boolean;
  service_name: string;
  description?: string;
  price?: number;
  garage_id: number;
}

