import { Coordinate } from "modules/garage/dto/coordinate.dto";

export interface EmergentRequestDto{
  uid?: string;
  location: Coordinate
  vehicle: {
    verhicleNo: string,
    type: "CAR" | "BIKE",
    brand : "String"
  },
  remark: string,
  create_timestamp: Date
}
