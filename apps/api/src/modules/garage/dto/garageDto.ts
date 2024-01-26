export interface GarageDto {
  created_date?: Date;
  updated_date?: Date;
  created_user?: number;
  updated_user?: number;
  is_deleted?: boolean;
  avatar_url?: string;
  email?: string;
  address?: string;
  introduction?: string;
  introduction_url: string[];
  owner_id?: string;
  place_id: number;
  account_id?: number;
  garage_id?: number;
  ownerName?: string,
  ownerEmail?: string,
  ownerPhone?: string,
  name?: string
  place?: {
    lat: number,
    lng: number,
  }

}

export interface UpdateGarageDto {
  name?: string;
  created_date?: Date;
  updated_date?: Date;
  created_user?: number;
  updated_user?: number;
  is_deleted?: boolean;
  avatar_url?: string;
  email?: string;
  address?: string;
  introduction?: string;
  introduction_url?: string[];
  owner_id?: string;
  place_id?: number;
  account_id?: number
}
