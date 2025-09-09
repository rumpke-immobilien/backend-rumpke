import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { RumpkeaiModule } from './rumpkeai/rumpkeai.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    RumpkeaiModule,
  ],
})
export class AppModule {}
