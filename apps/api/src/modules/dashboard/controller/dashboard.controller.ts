import { Controller } from "@nestjs/common";
import { Client, ClientKafka, Transport } from "@nestjs/microservices";

@Controller()
export class DashboardController {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'noti-consumer',
        brokers: ['wyvernp.id.vn:9092'],
      },
      consumer: {
        groupId: 'noti-consumer'
      }
    }
  })
  client: ClientKafka;
  onModuleInit() {
    this.client.subscribeToResponseOf('hero.kill.dragon');
  }
}
