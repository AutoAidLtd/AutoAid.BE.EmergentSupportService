import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { Coordinate } from "../dto/coordinate.dto";



@Injectable()
export class GarageService {
  public constructor(private readonly httpService: HttpService) {}
  public async getNearbyGarages(coordinate: Coordinate) {
    try {
      const result = await this.httpService.get("").toPromise();
      // Handle the result here
      console.log(result.data);
    } catch (error) {
      // Handle the error here
    }
  }
}
