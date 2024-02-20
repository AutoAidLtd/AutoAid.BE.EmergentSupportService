import { NestFactory } from "@nestjs/core";
import { ApiModule } from "./api.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { resolve } from "path";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

function useSwagger(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle("Cats example")
    .setDescription("The cats API description")
    .setVersion("1.0")
    .addTag("cats")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApiModule);
  
  useSwagger(app);

  app.useStaticAssets(resolve(__dirname, "..", "public"));
  app.enableCors({
    origin: ["http://localhost:5173"],
    methods: "*",
  });

  // app.useWebSocketAdapter(new SocketIoAdapter(app))
  await app.listen(4000);
}
bootstrap();
