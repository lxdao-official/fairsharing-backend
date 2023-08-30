import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UpdateUserBody } from '@core/type/doc/user';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserInfo(wallet: string) {
    const user = await this.findUserByWallet(wallet);
    if (!user) {
      const user = await this.createUser(wallet);
      await this.associateContributor(wallet, user.id);
      return user;
    }
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

  async associateContributor(wallet: string, userId: string) {
    return this.prisma.contributor.updateMany({
      where: {
        wallet,
      },
      data: {
        userId,
      },
    });
  }

  async editUser(body: UpdateUserBody, userId: string) {
    const { avatar, name, bio } = body;
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
