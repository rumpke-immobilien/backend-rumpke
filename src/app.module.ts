import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

import { RumpkeaiModule } from './rumpkeai/rumpkeai.module';
import { AppController } from './app.controller';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    RumpkeaiModule,
    EmailModule,
  ],
  controllers: [AppController],
})
export class AppModule { }
