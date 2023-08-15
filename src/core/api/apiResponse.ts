import { Code } from '@core/code';
import { Nullable } from '@core/type';

export class ApiResponse<TData> {
  readonly code: number;

  readonly message: string;

  readonly timestamp: number;

  readonly data: Nullable<TData>;

  private constructor(code: number, message: string, data?: TData) {
    this.code = code;
    this.message = message;
    this.data = data || null;
    this.timestamp = Date.now();
  }

  static success<TData>(data?: TData, message?: string): ApiResponse<TData> {
    const resultCode: number = Code.SUCCESS.code;
    const resultMessage: string = message || Code.SUCCESS.message;

    return new ApiResponse(resultCode, resultMessage, data);
  }

  static error<TData>(
    code?: number,
    message?: string,
    data?: TData,
  ): ApiResponse<TData> {
    const resultCode: number = code || Code.INTERNAL_ERROR.code;
    const resultMessage: string = message || Code.INTERNAL_ERROR.message;

    return new ApiResponse(resultCode, resultMessage, data);
  }
}
