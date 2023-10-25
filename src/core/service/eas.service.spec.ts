import { Test } from '@nestjs/testing';

import { Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { loggingMiddleware, PrismaModule, PrismaService } from 'nestjs-prisma';
import { EasService } from './eas.service';

describe('CatsController', () => {
  let catsService: EasService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [EasService, PrismaService],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        PrismaModule.forRoot({
          isGlobal: true,
          prismaServiceOptions: {
            middlewares: [
              loggingMiddleware({
                logger: new Logger('PrismaMiddleware'),
                logLevel: 'log',
              }),
            ],
          },
        }),
      ],
    }).compile();

    catsService = moduleRef.get<EasService>(EasService);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      await catsService.getEASVoteResult(
        '0x43d9f98d7c1fad8ed9074851f52864ad928d79b5e3e6afa72bd7e22eb1c47ffb',
        10,
      );
    });
  });
});
