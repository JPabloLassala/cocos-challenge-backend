import { Environments, IAppConfig } from "@/Config";
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/Config";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly configService: ConfigService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const { environment } = this.configService.get<IAppConfig>("app");
    const getStack = () => {
      if (environment !== Environments.Development) {
        return undefined;
      }
      if (exception instanceof Error) {
        return exception.stack.split("\n");
      }
      return exception;
    };

    const responseBody = {
      statusCode: httpStatus,
      message: exception instanceof Error ? exception.message : exception,
      stack: getStack(),
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
