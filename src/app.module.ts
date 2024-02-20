import { HttpExceptionFilter } from '@/src/middleware/exceptionFilter';
import LogsMiddleware from '@/src/middleware/logs';
import { ContributionModule } from '@/src/module/contribution.module';
import { ContributorModule } from '@/src/module/contributor.module';
import { EasModule } from '@/src/module/eas.module';
import { PaymentModule } from '@/src/module/payment.module';
import { UserModule } from '@/src/module/user.module';
import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { ProjectModule } from './module/project.module';

@Module({
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
    ProjectModule,
    ContributorModule,
    UserModule,
    ContributionModule,
    EasModule,
    PaymentModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
