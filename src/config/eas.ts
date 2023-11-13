export interface EASChainConfig {
  chainId: number;
  chainName: string;
  version: string;
  contractAddress: string;
  schemaRegistryAddress: string;
  etherscanURL: string;
  /** Must contain a trailing dot (unless mainnet). */
  subdomain: string;
  rpcProvider: string;
  graphQLEndpoint: string;
}

export const EAS_CHAIN_CONFIGS: EASChainConfig[] = [
  {
    chainId: 11155111,
    chainName: 'sepolia',
    subdomain: 'sepolia.',
    version: '0.26',
    contractAddress: '0xC2679fBD37d54388Ce493F1DB75320D236e1815e',
    schemaRegistryAddress: '0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0',
    etherscanURL: 'https://sepolia.etherscan.io',
    rpcProvider: `https://sepolia.infura.io/v3/`,
    graphQLEndpoint: 'https://sepolia.easscan.org/graphql',
  },
  {
    chainId: 10,
    chainName: 'optimism',
    subdomain: 'optimism.',
    version: '1.0.1',
    contractAddress: '0x4200000000000000000000000000000000000021',
    schemaRegistryAddress: '0x4200000000000000000000000000000000000020',
    etherscanURL: 'https://optimism.easscan.org',
    rpcProvider: 'https://opt-mainnet.g.alchemy.com/v2',
    graphQLEndpoint: 'https://optimism.easscan.org/graphql',
  },
  {
    chainId: 1,
    chainName: 'mainnet',
    subdomain: '',
    version: '0.26',
    contractAddress: '0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587',
    schemaRegistryAddress: '0xA7b39296258348C78294F95B872b282326A97BDF',
    etherscanURL: 'https://etherscan.io',
    rpcProvider: `https://mainnet.infura.io/v3/`,
    graphQLEndpoint: 'https://easscan.org/graphql',
  },
  {
    chainId: 420,
    chainName: 'goerli-optimism',
    subdomain: 'optimism-goerli-bedrock.',
    version: '1.0.1',
    contractAddress: '0x4200000000000000000000000000000000000021',
    schemaRegistryAddress: '0x4200000000000000000000000000000000000020',
    etherscanURL: 'https://optimism-goerli-bedrock.easscan.org',
    rpcProvider: `https://mainnet.infura.io/v3/`,
    graphQLEndpoint: 'https://optimism-goerli-bedrock.easscan.org/graphql',
  },
];

export const EasSchemaMap = {
  contribution:
    '0x0228657dc20f814b0770867d1a85ac473a0dc393c52603ef318bdab79dd9ea63',
  vote: '0xe045889447a1b5ec1e4771b23e89f38f1cf379ec2e708e1789dfbf4739cdf56f',
  claim: '0x4670eabb8d0ed4d28ed4b411defaf202695497dd78f32627dd77d3a0c4c00024',
};

export const MainEasSchemaMap = {
  contribution:
    '0x94cef30720b63a5aa25982d458049c0e731d4d976626acfb74c2865c331bd856',
  vote: '0x4178647bccbc81a81357a9d969526a23e269123ff71f69fc8708c9d099d0e14a',
  claim: '0x60cf8f1d82f6322b466cd0141bd3a68f7732373e805042e0000a259182a67612',
};
