import { Module } from '@nestjs/common';
import { RumpkeaiController } from './rumpkeai.controller';
import { RumpkeaiService } from './rumpkeai.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CaptchaService } from 'src/captcha/captcha.service';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [PrismaModule, EmailModule],
  controllers: [RumpkeaiController],
  providers: [RumpkeaiService, CaptchaService],
})
export class RumpkeaiModule { }
