import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
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
    private readonly captchaService: CaptchaService,
    private readonly emailService: EmailService
  ) { }

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async rumpkeAIAssistant(rumpkeAIDto: RumpkeAIDto) {
    return await rumpkeAIAssistantUseCase(this.openai, { prompt: rumpkeAIDto.prompt });
  }

  async submitTipForm(createTipFormDto: CreateTipFormDto) {
    const { captchaToken, ...formData } = createTipFormDto;
    const isValid = await this.captchaService.verify(captchaToken);
    if (!isValid) {
      throw new Error('Captcha-Validierung fehlgeschlagen');
    }

    const tipForm = await this.prisma.tipForm.create({
      data: formData,
    });

    const emailBody = `Neue Tippgeber-Anfrage!\n\nPrämie: ${formData.praemie}\nName des Tippgebers: ${formData.tippgeberName}\nKontakt des Tippgebers: ${formData.tippgeberKontakt}\nAdresse des Tippgebers: ${formData.tippgeberAdresse}\nPLZ/Stadt: ${formData.plzOderStadt}\nBeziehung zum Eigentümer: ${formData.beziehungEigentuemer}\nObjektadresse: ${formData.immobilienAdresse}\nName des Eigentümers: ${formData.eigentuemerName || '-'}\nKontakt des Eigentümers: ${formData.eigentuemerKontakt || '-'}\n`;
    await this.emailService.sendMail({
      to: 'info@rumpke-immobilien.de',
      subject: 'Neue Tippgeber-Anfrage über das Formular',
      text: emailBody,
    });

    if (formData.tippgeberKontakt && formData.tippgeberName) {
      const userEmailBody = `Hallo ${formData.tippgeberName},\n\nherzlichen Dank für deinen Tipp! Wir haben deine Angaben erhalten und werden uns in Kürze persönlich bei dir melden, um alles Weitere zu besprechen.\n\nFalls du Fragen hast, kannst du jederzeit auf diese E-Mail antworten oder uns direkt kontaktieren.\n\nMehr Informationen findest du auf:\nhttps://www.ichschenkedirwas.de/\nhttps://www.rumpke-immobilien.de/\n\nVielen Dank für dein Vertrauen und deine Unterstützung!\n\nFreundliche Grüße\nDein Ich schenke dir was Team`;
      await this.emailService.sendMail({
        to: formData.tippgeberKontakt,
        subject: 'Vielen Dank für deinen Tipp!',
        text: userEmailBody,
      });
      
    }

    const totalSubmissions = await this.prisma.tipForm.count();
    return { received: tipForm, totalSubmissions };
  }

  async countTips() {
    const totalSubmissions = await this.prisma.tipForm.count();
    return { totalSubmissions };
  }
}
