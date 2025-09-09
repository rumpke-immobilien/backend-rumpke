import { Injectable } from '@nestjs/common';
import { rumpkeAIAssistantUseCase } from './use-case/rumpkeai-assistant-use-case';
import { RumpkeAIDto } from './dtos/rumpkeai.dto';
import { CreateTipFormDto } from './dtos/create-tip-form.dto';
import OpenAI from 'openai';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RumpkeaiService {
  constructor(private readonly prisma: PrismaService) {}

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async rumpkeAIAssistant(rumpkeAIDto: RumpkeAIDto) {
    return await rumpkeAIAssistantUseCase(this.openai, { prompt: rumpkeAIDto.prompt });
  }

  async submitTipForm(createTipFormDto: CreateTipFormDto) {
    const tipForm = await this.prisma.tipForm.create({
      data: createTipFormDto,
    });
    const totalSubmissions = await this.prisma.tipForm.count(); // cuenta después de guardar
    console.log('Formulario guardado:', tipForm);
    return { received: tipForm, totalSubmissions }; // retorna el contador actualizado
  }

  async countTips() {
    const totalSubmissions = await this.prisma.tipForm.count();
    return { totalSubmissions };
  }
}
