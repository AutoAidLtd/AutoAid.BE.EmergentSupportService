import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import {resolve} from "path"
import {SocketIoAdapter} from "@secretlab/socket"
(BigInt.prototype as any).toJSON = function() {
  return this.toString()
}
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApiModule);
  app.useStaticAssets(resolve(__dirname, '..', 'public'));
  app.enableCors();
  // app.useWebSocketAdapter(new SocketIoAdapter(app))
  await app.listen(4000);
}
bootstrap();
