



import { Injectable } from '@nestjs/common';
import nodemailer, { Transporter, SendMailOptions as NodemailerSendMailOptions } from 'nodemailer';


export interface SendMailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
}

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
      },
    });
  }

  async sendMail(options: SendMailOptions): Promise<void> {
    const mailOptions: NodemailerSendMailOptions = {
      from: options.from || process.env.SMTP_USER,
      ...options,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
