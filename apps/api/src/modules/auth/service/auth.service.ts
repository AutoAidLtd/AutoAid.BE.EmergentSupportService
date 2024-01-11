import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "@secretlab/prisma/dist";


@Injectable()
export class AuthService{
  constructor(private readonly jwtService: JwtService, private readonly prismaService: PrismaService){}
  async extractUser(token: string) {
    console.log({jwtSerivce:this.jwtService});
    console.log({
      token: await this.jwtService.verifyAsync(token,{
        secret: process.env.JWT_ACCESS_SECRET
      })
    });
    const cred =  await this.jwtService.verifyAsync(token,{
      secret: process.env.JWT_ACCESS_SECRET
    })
    const user = this.prismaService.account.findFirst({
      where: {
        account_id : Number.parseInt(cred.subject)
      }
    })
    return user;
  }
  async sign(subId: string){
    return this.jwtService.sign({
      subject: subId
    }, {
      secret: process.env.JWT_ACCESS_SECRET
    })
  }
}
