import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ethers } from 'ethers';
import { PrismaService } from 'nestjs-prisma';
import {
  EAS_CHAIN_CONFIGS,
  EasSchemaMap,
  MainEasSchemaMap,
} from '../../config/eas';
import { PrepareClaimQuery } from '../type/doc/contribution';
import {
  EasAttestation,
  EasAttestationData,
  EasAttestationDecodedData,
  EasSchemaVoteKey,
  IVoteValueEnum,
} from '../type/eas';

@Injectable()
export class EasService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async getSignature(contributionId: number, query: PrepareClaimQuery) {
    const { chainId, wallet, toWallet } = query;

    const hash = ethers.keccak256(
      ethers.AbiCoder.defaultAbiCoder().encode(
        ['uint256', 'address', 'address', 'uint64'],
        [chainId, wallet, toWallet, contributionId],
      ),
    );

    const key = this.configService.get('SIGN_PRIVATE_KEY');
    const signerWallet = new ethers.Wallet(key);
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

    const userVoterMap: Record<string, number[]> = {};
    easVoteList?.forEach((vote) => {
      const { signer } = vote.data as EasAttestationData;
      const decodedDataJson =
        vote.decodedDataJson as EasAttestationDecodedData<EasSchemaVoteKey>[];
      const voteValueItem = decodedDataJson.find(
        (item) => item.name === 'VoteChoice',
      );
      if (voteValueItem) {
        const voteNumber = voteValueItem.value.value as IVoteValueEnum;
        if (userVoterMap[signer]) {
          userVoterMap[signer].push(voteNumber);
        } else {
          userVoterMap[signer] = [voteNumber];
        }
      }
    });
    let For = 0;
    let against = 0;
    for (const [_, value] of Object.entries(userVoterMap)) {
      const lastVote = value[value.length - 1];
      lastVote === IVoteValueEnum.FOR ? For++ : against++;
    }
    return For / (For + against) > 0.5;
  }

  private getGraphEndpoint(chainId: number) {
    const activeChainConfig =
      EAS_CHAIN_CONFIGS.find((config) => config.chainId === chainId) ||
      EAS_CHAIN_CONFIGS[3];
    return activeChainConfig.graphQLEndpoint;
  }
}
