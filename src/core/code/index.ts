export type CodeDescription = {
  code: number;
  message: string;
};

export class Code {
  static SUCCESS: CodeDescription = {
    code: 0,
    message: 'Success.',
  };

  static INTERNAL_ERROR: CodeDescription = {
    code: 1001,
    message: 'Internal error.',
  };

  static DB_ERROR: CodeDescription = {
    code: 1002,
    message: 'Db error.',
  };
}
