export type EasAttestationDecodedData<T> = {
  name: string;
  signature: string;
  type: string;
  value: {
    name: T;
    type: string;
    value: string | number | { type: 'BigNumber'; hex: string };
  };
};

export interface EasAttestationData {
  signer: string;
  sig: Record<string, any>;
}
export type EasAttestation<K> = {
  id: string;
  refUID: string;
  ipfsHash: string;
  recipient: string;
  /**
   * can be JSON.parse
   */
  decodedDataJson: string | EasAttestationDecodedData<K>[];
  /**
   * can be JSON.parse
   */
  data: string | EasAttestationData;
  attester: string;
  revocable: string;
  revoked: string;
};

export enum IVoteValueEnum {
  FOR = 1,
  AGAINST = 2,
  ABSTAIN = 3,
}

export type EasSchemaVoteKey =
  | 'ProjectAddress'
  | 'ContributionID'
  | 'VoteChoice'
  | 'Comment';
