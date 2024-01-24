import { Injectable } from "@nestjs/common";
import { WebSocketGateway } from "@nestjs/websockets";
import { PrismaService } from "@secretlab/prisma";
import { ActiveUsersDashboardDto } from "../dto/ActiveUsersDashboardDto";

@Injectable()
export class DashboardService {
  constructor(private readonly prisma:PrismaService){}
  async getUsersCurrentMonth():Promise<ActiveUsersDashboardDto> {
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const last2Month = new Date();
    last2Month.setMonth(lastMonth.getMonth() - 1);

    const todayDateOnly = today.toISOString().split('T')[0];
    const lastMonthDateOnly = lastMonth.toISOString().split('T')[0];
    const last2MonthDateOnly = last2Month.toISOString().split('T')[0];

    const getLastMonthUsersTask =  this.prisma.$queryRaw<{join_date: Date, user_count: BigInt}[]>`
        SELECT
      DATE(created_date) AS join_date,
      COUNT(*) AS user_count
    FROM
      ids.account
    WHERE  created_date >= ${lastMonthDateOnly}::timestamp AND
          created_date <= ${todayDateOnly}::timestamp
    GROUP BY
      DATE(created_date)
    ORDER BY
      join_date;
    `
    const getLast2MonthUsersTask =  this.prisma.$queryRaw<{join_date: Date, user_count: BigInt}[]>`
        SELECT
      DATE(created_date) AS join_date,
      COUNT(*) AS user_count
    FROM
      ids.account
    WHERE  created_date >= ${last2MonthDateOnly}::timestamp AND
          created_date <= ${lastMonthDateOnly}::timestamp
    GROUP BY
      DATE(created_date)
    ORDER BY
      join_date;
    `
   const [result, result2] = await Promise.all([getLastMonthUsersTask, getLast2MonthUsersTask])
    const sum1 = result.reduce((prev,cur )=> {
      return prev += Number(cur.user_count)
    },0)
    const sum2 = result2.reduce((prev,cur)=> {
      return prev += Number(cur.user_count)
    },0)
    const percentageChange = (sum1-sum2)/sum1 * 100;
    console.log({
      sum1,
      sum2,
      percentageChange
    });

   return {
    current : result.reduce((prev, cur) => ({...prev, [cur.join_date.toISOString().split('T')[0]]: Number(cur.user_count)}),{}),
    previous : result2.reduce((prev, cur) => ({...prev, [cur.join_date.toISOString().split('T')[0]]: Number(cur.user_count)}),{}),
    percentageComparisonToPrevious: percentageChange
   }

    // Start the loop from last month to today
    // for (let date = new Date(lastMonth); date <= today; date.setDate(date.getDate() + 1)) {
    //   console.log(date);
    //   // Perform your loop logic here
    // }
  }
}
