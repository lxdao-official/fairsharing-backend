import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { AuthBody } from '@core/type/doc/auth';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async auth(body: AuthBody) {}
}
