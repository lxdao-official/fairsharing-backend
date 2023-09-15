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
    code: 10001,
    message: 'Internal error.',
  };

  static DB_ERROR: CodeDescription = {
    code: 10002,
    message: 'Db error.',
  };

  static NOT_FOUND_ERROR: CodeDescription = {
    code: 10003,
    message: 'Not found.',
  };

  // Contributors
  static WALLET_UNIQUE_ERROR: CodeDescription = {
    code: 10100,
    message: 'Contributor wallet must be unique.',
  };

  // Project
  static OWNER_PERMISSION_ERROR: CodeDescription = {
    code: 10200,
    message: 'Project must have only one owner.',
  };

  // Contribution
  static CONTRIBUTION_STATUS_ERROR: CodeDescription = {
    code: 10300,
    message: 'Contribution status flow failure.',
  };

  static CONTRIBUTION_UID_ERROR: CodeDescription = {
    code: 10301,
    message: 'Contribution uid missing.',
  };

  static CONTRIBUTION_CLAIM_Auth_ERROR: CodeDescription = {
    code: 10302,
    message: `You can't claim this contribution.`,
  };
}
