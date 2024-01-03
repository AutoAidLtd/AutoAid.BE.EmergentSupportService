import { Coordinate } from "modules/garage/dto/coordinate.dto";

export interface EmergentRequestDto{
  location: Coordinate
  vehicle: {
    verhicleNo: string,
    type: "CAR" | "BIKE",
    brand : "String"
  },
  remark: string,
  create_timestamp: Date
}
