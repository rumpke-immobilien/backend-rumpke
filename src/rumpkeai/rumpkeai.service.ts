import { Injectable } from '@nestjs/common';
import { rumpkeAIAssistantUseCase } from './use-case/rumpkeai-assistant-use-case';
import { RumpkeAIDto } from './dtos/rumpkeai.dto';
import { CreateTipFormDto } from './dtos/create-tip-form.dto';
import OpenAI from 'openai';
import { PrismaService } from 'src/prisma/prisma.service';
import { CaptchaService } from 'src/captcha/captcha.service';

@Injectable()
export class RumpkeaiService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly captchaService: CaptchaService
  ) {}

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async rumpkeAIAssistant(rumpkeAIDto: RumpkeAIDto) {
    return await rumpkeAIAssistantUseCase(this.openai, { prompt: rumpkeAIDto.prompt });
  }

  async submitTipForm(createTipFormDto: CreateTipFormDto) {
    const { captchaToken, ...formData } = createTipFormDto;

    // Valida el captcha antes de guardar
    const isValid = await this.captchaService.verify(captchaToken);
    if (!isValid) {
      throw new Error('Captcha validation failed');
    }

    // Guarda el formulario solo si el captcha es válido
    const tipForm = await this.prisma.tipForm.create({
      data: formData,
    });
    const totalSubmissions = await this.prisma.tipForm.count();
    console.log('Formulario guardado:', tipForm);
    return { received: tipForm, totalSubmissions };
  }

  async countTips() {
    const totalSubmissions = await this.prisma.tipForm.count();
    return { totalSubmissions };
  }
}
