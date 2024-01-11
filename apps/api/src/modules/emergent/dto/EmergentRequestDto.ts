import { Coordinate } from "modules/garage/dto/coordinate.dto";

export interface EmergentRequestDto{
  uid?: string;
  no?: number
  location: Coordinate
  vehicle?: {
    verhicleNo: string,
    type: "CAR" | "BIKE",
    brand : "String"
  },
  remark: string,
  create_timestamp: Date,
  room_uid: string,
  garage_id?: number
  customer_id? : number
}
