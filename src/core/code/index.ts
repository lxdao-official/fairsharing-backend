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

  static NO_AUTH: CodeDescription = {
    code: 10004,
    message: 'No Auth.',
  };

  // Contributors
  static WALLET_UNIQUE_ERROR: CodeDescription = {
    code: 10100,
    message: 'Contributor wallet must be unique.',
  };

  // Project
  static ADMIN_PERMISSION_ERROR: CodeDescription = {
    code: 10200,
    message: 'Project must have one admin.',
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

  static CONTRIBUTION_CLAIM_AUTH_ERROR: CodeDescription = {
    code: 10302,
    message: `You can't claim this contribution.`,
  };

  static CONTRIBUTION_CLAIM_TIME_ERROR: CodeDescription = {
    code: 10303,
    message: `You can't claim this contribution.`,
  };

  static CONTRIBUTION_CLAIM_VOTE_NUMBER_ERROR: CodeDescription = {
    code: 10304,
    message: `The number of votes doesn't comply with the rules.`,
  };
}
