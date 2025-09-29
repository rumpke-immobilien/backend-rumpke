import { Controller, Post, Body, Req } from '@nestjs/common';
import { EmailService, SendMailOptions } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @Post('test')
  async sendTestEmail(@Body() body: { to: string }, @Req() req: any) {
    const mailOptions: SendMailOptions = {
      to: body?.to,
      subject: 'Test Email from Rumpke Backend',
      text: 'This is a test email sent from the Rumpke backend using SendGrid integration. If you received this, everything is working!',
    };
    await this.emailService.sendMail(mailOptions);
    return { message: 'Email successfully sent to ' + body?.to };
  }
}
