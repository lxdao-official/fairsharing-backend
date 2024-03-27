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
  {
    chainId: 11155420,
    chainName: 'optimism-sepolia',
    subdomain: 'optimism-sepolia.',
    version: '1.0.2',
    contractAddress: '0x4200000000000000000000000000000000000021',
    schemaRegistryAddress: '0x4200000000000000000000000000000000000020',
    etherscanURL: 'https://optimism-sepolia.easscan.org',
    rpcProvider: `https://sepolia.optimism.io`,
    graphQLEndpoint: 'https://optimism-sepolia.easscan.org/graphql',
  },
];

export const EasSchemaMap = {
  contribution:
    '0x0228657dc20f814b0770867d1a85ac473a0dc393c52603ef318bdab79dd9ea63',
  vote: '0xe045889447a1b5ec1e4771b23e89f38f1cf379ec2e708e1789dfbf4739cdf56f',
  claim: '0x4670eabb8d0ed4d28ed4b411defaf202695497dd78f32627dd77d3a0c4c00024',
};

export const SepoliaEasSchemaMap = {
  contribution:
    '0xa429ad803ae12a0fcb9c0c130673a4c7357da08e1407b62bce5cfe358d673526',
  vote: '0x6e4068d80a37bc2fb9223e2f07b909b98b370d76b1d94cd83c1a64bb6006a9e5',
  claim: '0x957c1ce9579ea03fcd9e08f0ef9d0ef4ba3ca67f7b459655bcf87a060fd772ca',
};

export const MainEasSchemaMap = {
  contribution:
    '0xc012dddde021c7258ff4671b1be08fe6b3b51d98bd0a89b43d020fafde24b476',
  vote: '0x2a3fe60324ed2be48cf5790d6edc7bdbc28042f7abebb81329aec640f3439a52',
  claim: '0x5bf21260c46b75fe29ccc66463c2bf4cf71264da7610f52cafefa5604d30fe61',
};
