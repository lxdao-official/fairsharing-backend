export type CodeDescription = {
  code: number;
  message: string;
};

export class Code {
  static SUCCESS: CodeDescription = {
    code: 200,
    message: 'Success.',
  };

  static INTERNAL_ERROR: CodeDescription = {
    code: 500,
    message: 'Internal error.',
  };
}
