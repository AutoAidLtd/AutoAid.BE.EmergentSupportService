import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "@secretlab/prisma/dist";
interface IAnalyticService {
  analyseCustomerAge: ()=>Promise<{label: string, value: number}[]>
  analyseCustomerGender: ()=>Promise<{label: string, value: number}[]>
}

@Injectable()
export class AnalyticService implements IAnalyticService{
  public constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService
  ) {}
  async analyseCustomerGender() {
    const genders:string[] = (await this.prisma.customer.findMany({
      distinct: "gender",
      select: {
        gender: true
      }
    })).map(g => g.gender);
    console.log({genders});

    const countByGender = await Promise.all(genders?.map(async (g)=> {
      return {
        label : g,
        value: await this.prisma.customer.count({
          where : {
            gender : g
          }
        })
      }
    }))

    return countByGender;
  }

  async analyseCustomerAge() {
    const result = await Promise.all([
      this.prisma.customer.count({
        where: {
          date_of_birth: {
            gte: new Date(new Date().setFullYear(new Date().getFullYear() - 18))
          }
        }
      }),
      this.prisma.customer.count({
        where: {
          date_of_birth: {
            lt: new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
            gte: new Date(new Date().setFullYear(new Date().getFullYear() - 24))
          }
        }
      }),
      this.prisma.customer.count({
        where: {
          date_of_birth: {
            lt: new Date(new Date().setFullYear(new Date().getFullYear() - 24)),
            gte: new Date(new Date().setFullYear(new Date().getFullYear() - 35))
          }
        }
      }),
      this.prisma.customer.count({
        where: {
          date_of_birth: {
            lt: new Date(new Date().setFullYear(new Date().getFullYear() - 35))
          }
        }
      }),
    ],
    );

    return [
      {
      label : "<18",
      value : result?.[0]??0,
    },
      {
      label : "18-24",
      value : result?.[1]??0,
    },
      {
      label : "24-35",
      value : result?.[2]??0,
    },
      {
      label : ">35",
      value : result?.[3]??0,
    },
]
  }

}
