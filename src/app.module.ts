import { MiddlewareConsumer, Module, Logger } from '@nestjs/common';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { ProjectModule } from './module/project.module';
import LogsMiddleware from '@/src/middleware/logs';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '@/src/middleware/exceptionFilter';

@Module({
  imports: [
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
