import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UpdateUserBody } from '@core/type/doc/user';
import { Code } from '@core/code';
import { ContributorService } from '@service/contributor.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private contributorService: ContributorService,
  ) {}

  async getUserInfo(wallet: string) {
    return this.findUserByWallet(wallet);
  }

  async signup(wallet: string) {
    const user = await this.createUser(wallet);
    await this.contributorService.associateContributor(wallet, user.id);
    return user;
  }

  async createUser(wallet: string) {
    return this.prisma.user.create({
      data: {
        wallet,
      },
    });
  }

  async findUserByWallet(wallet: string) {
    return this.prisma.user.findFirst({
      where: {
        wallet,
      },
    });
  }

  async editUser(body: UpdateUserBody, userId: string) {
    const { avatar, name, bio } = body;
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new HttpException(
        Code.NOT_FOUND_ERROR.message,
        Code.NOT_FOUND_ERROR.code,
      );
    }
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar,
        name,
        bio,
      },
    });
  }
}
