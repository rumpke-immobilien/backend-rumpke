import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { RumpkeaiModule } from './rumpkeai/rumpkeai.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    RumpkeaiModule,
  ],
  controllers: [AppController],
})
export class AppModule { }
