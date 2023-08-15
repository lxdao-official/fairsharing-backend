import { Code } from '@core/code';
import { Nullable } from '@core/type/common';

export class CoreApiResponse<TData> {
  readonly code: number;

  readonly message: string;

  readonly data: Nullable<TData>;

  private constructor(code: number, message: string, data?: TData) {
    this.code = code;
    this.message = message;
    this.data = data || null;
  }

  static success<TData>(
    data?: TData,
    message?: string,
  ): CoreApiResponse<TData> {
    const resultCode: number = Code.SUCCESS.code;
    const resultMessage: string = message || Code.SUCCESS.message;

    return new CoreApiResponse(resultCode, resultMessage, data);
  }

  static error<TData>(
    code?: number,
    message?: string,
    data?: TData,
  ): CoreApiResponse<TData> {
    const resultCode: number = code || Code.INTERNAL_ERROR.code;
    const resultMessage: string = message || Code.INTERNAL_ERROR.message;

    return new CoreApiResponse(resultCode, resultMessage, data);
  }
}
