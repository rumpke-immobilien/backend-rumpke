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
      const userEmailBody = `Hallo ${formData.tippgeberName},

herzlichen Dank für deinen Tipp und dein Vertrauen in unsere Arbeit als Immobilienmakler.
Wir freuen uns sehr, dass du an uns gedacht hast und uns einen möglichen Verkaufshinweis gegeben hast.

Wir werden dem möglichen Eigentümer einen neutralen Gutschein für eine Wertermittlung einwerfen.
So erhält er ganz unverbindlich die Möglichkeit, sich bei Interesse selbst bei uns zu melden – selbstverständlich ohne, dass dabei persönliche Informationen offengelegt werden.

Du kannst den Eigentümer gerne zusätzlich informieren, dass du uns empfohlen hast und er sich bei Interesse direkt melden darf.
Das liegt natürlich ganz in deinem Ermessen – du kannst auch gern anonym bleiben.

Selbstverständlich halten wir dich auf dem Laufenden, wenn aus deinem Hinweis etwas Konkretes entsteht.
Und wie versprochen, wartet bei erfolgreichem Abschluss eine schöne Aufmerksamkeit auf dich!

Nochmals vielen Dank für dein Vertrauen und deine Unterstützung.
Solltest du in der Zwischenzeit irgendwelche Fragen haben, melde dich gerne jederzeit!

Herzliche Grüße

Datenschutzhinweis:
Die Angaben, die du uns im Rahmen deines Tipps übermittelst, werden ausschließlich zur Bearbeitung deines Hinweises verwendet.
Personenbezogene Daten des möglichen Eigentümers werden von uns nicht gespeichert, sondern nur dann verarbeitet, wenn die Person selbst Kontakt zu uns aufnimmt oder ihre Einwilligung erteilt.
Weitere Informationen findest du in unserer Datenschutzerklärung https://www.ichschenkedirwas.de/datenschuzt und unseren AGB https://www.ichschenkedirwas.de/agb.`;
      await this.emailService.sendMail({
        to: formData.tippgeberKontakt,
        subject: 'Vielen Dank für deinen Tipp – und dein Vertrauen!',
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
