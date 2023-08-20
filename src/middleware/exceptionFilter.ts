import { CoreApiResponse } from '@core/api/coreApiResponse';
import { Code } from '@core/code';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(error: Error, host: ArgumentsHost): void {
    const response: Response = host.switchToHttp().getResponse<Response>();

    let errorResponse: CoreApiResponse<unknown> = CoreApiResponse.error(
      Code.INTERNAL_ERROR.code,
      error.message,
    );

    errorResponse = this.handleNestError(error, errorResponse);

    response.json(errorResponse);
  }

  private handleNestError(
    error: Error,
    errorResponse: CoreApiResponse<unknown>,
  ): CoreApiResponse<unknown> {
    if (error instanceof PrismaClientKnownRequestError) {
      const statusCode = Code.DB_ERROR.code;
      const message = `[${error.code}]: ${this.exceptionShortMessage(
        error.message,
      )}`;
      return CoreApiResponse.error(statusCode, message, null);
    }
    if (error instanceof PrismaClientValidationError) {
      const statusCode = Code.DB_ERROR.code;
      const message = Code.DB_ERROR.message;
      return CoreApiResponse.error(statusCode, message, null);
    }
    if (error instanceof HttpException) {
      return CoreApiResponse.error(error.getStatus(), error.message, null);
    }

    return errorResponse;
  }

  private exceptionShortMessage(message: string): string {
    const shortMessage = message.substring(message.indexOf('→'));

    return shortMessage
      .substring(shortMessage.indexOf('\n'))
      .replace(/\n/g, '')
      .trim();
  }
}
