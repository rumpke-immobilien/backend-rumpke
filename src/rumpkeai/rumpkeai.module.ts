import { Module } from '@nestjs/common';
import { RumpkeaiController } from './rumpkeai.controller';
import { RumpkeaiService } from './rumpkeai.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CaptchaService } from 'src/captcha/captcha.service';

@Module({
  imports: [PrismaModule],
  controllers: [RumpkeaiController],
  providers: [RumpkeaiService, CaptchaService],
})
export class RumpkeaiModule {}
