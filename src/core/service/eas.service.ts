import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Code } from '@core/code';
import { ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EasService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async getSignature(wallet: string, cId: number) {
    const contribution = await this.prisma.contribution.findFirst({
      where: {
        id: cId,
      },
    });
    if (!contribution) {
      throw new HttpException(
        Code.NOT_FOUND_ERROR.message,
        Code.NOT_FOUND_ERROR.code,
      );
    }

    const hash = ethers.keccak256(
      ethers.AbiCoder.defaultAbiCoder().encode(
        ['address', 'uint256', 'uint64'],
        [wallet, contribution.projectId, cId],
      ),
    );

    const key = this.configService.get('NEXT_PUBLIC__KEY');
    const signerWallet = new ethers.Wallet(key);
    return signerWallet.signMessage(ethers.getBytes(hash));
  }
}
