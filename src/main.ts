import { AppModule } from "@/App";
import { IAppConfig } from "@/Config";
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/Config";
import { NestFactory } from "@nestjs/core";
import { errorMorgan, successMorgan } from "./Config/morgan";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const { port } = configService.get<IAppConfig>("app");

  app.useGlobalPipes(new ValidationPipe());
  app.use(successMorgan);
  app.use(errorMorgan);

  await app.listen(port);
  Logger.log(`Server running on http://localhost:${port}`, "Bootstrap");
}
bootstrap();
