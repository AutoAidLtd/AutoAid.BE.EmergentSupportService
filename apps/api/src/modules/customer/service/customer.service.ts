import { Injectable } from "@nestjs/common";
import { PrismaModule, PrismaService } from "@secretlab/prisma/dist";
import { BaseService,Pageable, PagedList } from "@secretlab/core";
import { customerDto } from "../dto/customerDto";
@Injectable({})
export class CustomerService implements BaseService<customerDto, number >{
  public constructor (private readonly prisma :  PrismaService){}
  getDetail: (id: number) => Promise<customerDto>;
   async getList (paging: Pageable)  {
    const DEFAULT_PAGESIZE = 20;
    const skipSize = ((paging?.page ?? 1) - 1) * (paging?.pageSize ?? DEFAULT_PAGESIZE);

    const getCustomersTask = this.prisma.customer.findMany({
      skip: skipSize,
      take : paging?.pageSize ?? DEFAULT_PAGESIZE,
      include: {
        account : true,
      },
      where: {
        OR: [
          {
            email: {
              contains: paging?.keyword ?? "",
            },
          },
          {
            first_name: {
              contains: paging?.keyword ?? "",
            },
          },
          {
            last_name: {
              contains: paging?.keyword ?? "",
            },
          },
          {
            phone_number: {
              contains: paging?.keyword ?? "",
            },
          },
        ],
      },
    })
    // const getGarageTask = this.prisma.$queryRaw<GarageDto[]>`

    //  SELECT g.*, p.lat, p.lng
    //   -- a.username as ownerName,
    //   -- a.email as ownerEmail,
    //   -- a.phone_number as ownerPhone
    //   FROM app.garage g
    //   LEFT JOIN app.place p ON g.place_id = p.place_id
    //   -- LEFT JOin ids.account a ON g.owner_id = a.account_id
    //   LIMIT ${paging?.pageSize ?? DEFAULT_PAGESIZE}
    //   OFFSET ${
    //     ((paging?.page ?? 1) - 1) * (paging?.pageSize ?? DEFAULT_PAGESIZE)
    //   }
    // `;
    console.log(paging);
    const [customers, customerCount] = await Promise.all([
      getCustomersTask,

      this.prisma.customer.count({
        where : {
          // AND : {
            OR: [{
              email: {
                contains: paging?.keyword??""
              },
              first_name : {
                contains: paging?.keyword??""
              },
              last_name : {
                contains: paging?.keyword??""
              },
              phone_number : {
                contains: paging?.keyword??""
              },
            }]
          // }
        }
      }),
    ]);
    const customerDtos = customers.map((entity) => ({
      ...entity,
      account : {
        ...entity.account
      }
    })) as customerDto[];
    paging = {
      page: paging?.page ?? 1,
      pageSize: paging?.pageSize ?? DEFAULT_PAGESIZE,
      sort: paging?.sort,
      totalItems: customerCount,
      totalPages: Math.ceil(customerCount / DEFAULT_PAGESIZE),
    };
    return {
      pagination: paging,
      rows: customerDtos,
    } as PagedList<customerDto>;

}
  save: (element: customerDto) => number | boolean | Promise<boolean> | Promise<number>;
  update: (element: customerDto) => boolean | Promise<boolean>;
  delete: (element: number | customerDto) => boolean | Promise<boolean>;

}
