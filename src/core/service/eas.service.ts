import {
  EasAttestation,
  EasAttestationData,
  EasAttestationDecodedData,
  EasSchemaVoteKey,
  IVoteValueEnum,
} from '@core/type/eas';
import {
  getVoteStrategyABI,
  getVoteStrategyContract,
} from '@core/utils/contract';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Contributor, Project } from '@prisma/client';
import axios from 'axios';
import { AlchemyProvider, ethers } from 'ethers';
import { PrismaService } from 'nestjs-prisma';
import {
  EAS_CHAIN_CONFIGS,
  EasSchemaMap,
  MainEasSchemaMap,
} from '../../config/eas';

@Injectable()
export class EasService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  getSigner() {
    const key = this.configService.get('SIGN_PRIVATE_KEY');
    return new ethers.Wallet(key);
  }

  async getSignature(
    contributionId: string,
    chainId: number,
    toWallet: string,
    wallet: string,
  ) {
    const hash = ethers.keccak256(
      ethers.AbiCoder.defaultAbiCoder().encode(
        ['uint256', 'address', 'address', 'bytes32'],
        [chainId, wallet, toWallet, contributionId],
      ),
    );

    const signerWallet = this.getSigner();
    return signerWallet.signMessage(ethers.getBytes(hash));
  }

  async getEASVoteResult(uId: string, chainId?: number) {
    const easMap = chainId === 10 ? MainEasSchemaMap : EasSchemaMap;
    const query = `
		query Attestations {
		  attestations(
			where: {
			  schemaId: {
				equals: "${easMap.vote}"
			  }
			  refUID: { 
			   	equals: "${uId}"
			  }
			}
		  ) {
			id
			refUID
			ipfsHash
			recipient
			decodedDataJson
			data
			attester
			revocable
			revoked
		  }
		}
	`;
    const { data } = await axios.post<{
      data: { attestations: EasAttestation<EasSchemaVoteKey>[] };
    }>(this.getGraphEndpoint(chainId), {
      query,
    });
    const easVoteList = data.data.attestations.map((item) => ({
      ...item,
      decodedDataJson: JSON.parse(
        item.decodedDataJson as string,
      ) as EasAttestationDecodedData<EasSchemaVoteKey>[],
      data: JSON.parse(item.data as string) as EasAttestationData,
    }));

    const userVoterMap: Record<string, number> = {};
    easVoteList?.forEach((vote) => {
      const { signer } = vote.data as EasAttestationData;
      const decodedDataJson =
        vote.decodedDataJson as EasAttestationDecodedData<EasSchemaVoteKey>[];
      const voteValueItem = decodedDataJson.find(
        (item) => item.name === 'VoteChoice',
      );
      if (voteValueItem) {
        userVoterMap[signer] = voteValueItem.value.value as IVoteValueEnum;
      }
    });
    return userVoterMap;
  }

  async getVoteResult(
    uId: string,
    chainId: number,
    projectDetail: Project,
    contributorList: Contributor[],
  ) {
    const voteData = await this.getEASVoteResult(uId, chainId);
    const voteStrategyAddress = getVoteStrategyContract(
      projectDetail.voteApprove as any,
      chainId,
    );
    const ABI = getVoteStrategyABI(projectDetail.voteApprove as any);
    const testKey =
      chainId === 10
        ? 'gvJlCg5IaENekNwdoLn4Ah21yQOVvDaI'
        : 'E04mwXKYzTzNMgWcfivXOvo8qQfZDqy2';
    const AlchemyApiKey = this.configService.get('ALCHEMY_KEY') || testKey;
    const provider = new AlchemyProvider(chainId, AlchemyApiKey);
    const signer = this.getSigner().connect(provider);
    const contract = new ethers.Contract(voteStrategyAddress, ABI, signer);

    const voters: string[] = contributorList.map((item) => item.wallet);
    const voteValues: IVoteValueEnum[] = contributorList.map((contributor) => {
      if (voteData?.[contributor.wallet]) {
        return Number(voteData?.[contributor.wallet]);
      } else {
        return IVoteValueEnum.ABSTAIN;
      }
    });
    const weights: number[] = contributorList.map(
      (item) => item.voteWeight * 100,
    );
    const threshold = Number(projectDetail.voteThreshold) * 100;
    const votingStrategyData = ethers.toUtf8Bytes('');
    return contract.getResult(
      voters,
      voteValues,
      weights,
      threshold,
      votingStrategyData,
      votingStrategyData,
    );
  }

  private getGraphEndpoint(chainId: number) {
    const activeChainConfig =
      EAS_CHAIN_CONFIGS.find((config) => config.chainId === chainId) ||
      EAS_CHAIN_CONFIGS[3];
    return activeChainConfig.graphQLEndpoint;
  }
}
