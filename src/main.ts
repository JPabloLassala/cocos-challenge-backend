import { AppModule } from "@App";
import { IAppConfig } from "@Config";
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { HttpExceptionFilter } from "@Utils";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const { port } = configService.get<IAppConfig>("app");
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port);
  Logger.log(`Server running on http://localhost:${port}`, "Bootstrap");
}
bootstrap();
