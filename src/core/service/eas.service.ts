import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Code } from '@core/code';
import { ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';
import { EAS_CHAIN_CONFIGS, EasSchemaMap } from '@/src/config/eas';
import axios from 'axios';
import {
  EasAttestation,
  EasAttestationData,
  EasAttestationDecodedData,
  EasSchemaVoteKey,
  IVoteValueEnum,
} from '@core/type/eas';
import { PrepareClaimQuery } from '@core/type/doc/contribution';

@Injectable()
export class EasService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async getSignature(query: PrepareClaimQuery) {
    const { chainId, cId, wallet, toWallet } = query;

    const hash = ethers.keccak256(
      ethers.AbiCoder.defaultAbiCoder().encode(
        ['uint256', 'address', 'address', 'uint64'],
        [chainId, wallet, toWallet, cId],
      ),
    );

    const key = this.configService.get('SIGN_PRIVATE_KEY');
    const signerWallet = new ethers.Wallet(key);
    return signerWallet.signMessage(ethers.getBytes(hash));
  }

  async getEASVoteResult(uId: string, chainId?: number) {
    const query = `
		query Attestations {
		  attestations(
			where: {
			  schemaId: {
				equals: "${EasSchemaMap.vote}"
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
      attestations: EasAttestation<EasSchemaVoteKey>[];
    }>(this.getGraphEndpoint(chainId), {
      query,
    });
    const easVoteList = data.attestations.map((item) => ({
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
