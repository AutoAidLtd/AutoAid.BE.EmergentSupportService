import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from "path";
import { ApiModule } from './api.module';
(BigInt.prototype as any).toJSON = function() {
  return this.toString()
}
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApiModule);
  app.useStaticAssets(resolve(__dirname, '..', 'public'));
  app.enableCors({
  origin: ["*"],
    methods: "*"
  });
  // app.useWebSocketAdapter(new SocketIoAdapter(app))
  await app.listen(4000);
}
bootstrap();
