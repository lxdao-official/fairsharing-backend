export enum Permission {
  Owner = 1,
  Admin,
  Contributor,
}

export interface Contributor {
  nickName: string;
  wallet: string;
  permission: Permission;
  role: string;
}
