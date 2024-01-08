import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService{
  constructor(private readonly jwtService: JwtService){}
  async extractUser(token: string) {
    console.log({jwtSerivce:this.jwtService});

  }
}
