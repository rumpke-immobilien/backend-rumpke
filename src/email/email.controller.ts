import { Controller, Post, Body, Req } from '@nestjs/common';
import { EmailService, SendMailOptions } from './email.service';


@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @Post('test')
  async sendTestEmail(@Body() body: { to: string }, @Req() req: any) {
    const mailOptions: SendMailOptions = {
      to: body?.to,
      subject: 'Neue Tippgeber-Anfrage erhalten',
      text: 'Es wurde eine neue Tippgeber-Anfrage über das Formular eingereicht. Bitte prüfen Sie die Details und nehmen Sie ggf. Kontakt mit dem Interessenten auf.',
    };
    await this.emailService.sendMail(mailOptions);
    return { message: 'Email successfully sent to ' + body?.to };
  }
}
