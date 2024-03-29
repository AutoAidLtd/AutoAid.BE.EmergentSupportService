import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import {resolve} from "path"
import {SocketIoAdapter} from "@secretlab/socket"
import { AuthGuard } from 'auth.guard';
import { JwtService } from '@nestjs/jwt';
(BigInt.prototype as any).toJSON = function() {
  return this.toString()
}
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApiModule);
  app.useStaticAssets(resolve(__dirname, '..', 'public'));
  app.enableCors({
    origin: ["http://localhost:5173"],
    methods: "*"
  });
  // app.useWebSocketAdapter(new SocketIoAdapter(app))
  await app.listen(4000);
}
bootstrap();
