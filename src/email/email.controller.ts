import { Controller, Post, Body } from '@nestjs/common';
import { EmailService, SendMailOptions } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @Post('test')
  async sendTestEmail(@Body('to') to: string) {
    const mailOptions: SendMailOptions = {
      to,
      subject: 'Prueba de envío de correo',
      text: '¡El envío de correo desde el backend funciona correctamente!',
    };
    await this.emailService.sendMail(mailOptions);
    return { message: 'Correo enviado correctamente a ' + to };
  }
}
