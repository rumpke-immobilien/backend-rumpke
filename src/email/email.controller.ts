import { Controller, Post, Body } from '@nestjs/common';
import { EmailService, SendMailOptions } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @Post('test')
  async sendTestEmail(@Body('to') to: string) {
    const mailOptions: SendMailOptions = {
      to,
      subject: 'Test Email from Rumpke Backend',
      text: 'This is a test email sent from the Rumpke backend using SendGrid integration. If you received this, everything is working!',
    };
    await this.emailService.sendMail(mailOptions);
    return { message: 'Email successfully sent to ' + to };
  }
}
