

import { Injectable } from '@nestjs/common';

type Provider = 'turnstile' | 'hcaptcha' | 'recaptcha';

@Injectable()
export class CaptchaService {
  private provider: Provider = (process.env.CAPTCHA_PROVIDER as Provider) || 'turnstile';
  private secret = process.env.CAPTCHA_SECRET || process.env.TURNSTILE_SECRET || '';

  private endpoint() {
    switch (this.provider) {
      case 'hcaptcha': return 'https://hcaptcha.com/siteverify';
      case 'recaptcha': return 'https://www.google.com/recaptcha/api/siteverify';
      default: return 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    }
  }

  async verify(token: string, remoteip?: string): Promise<boolean> {
    if (!this.secret) {
      return false;
    }
    const body = new URLSearchParams({ secret: this.secret, response: token });
    if (remoteip) body.append('remoteip', remoteip);

    try {
      const res = await fetch(this.endpoint(), { method: 'POST', body });
      let data: any = null;
      try {
        data = await res.json();
      } catch (jsonErr) {
        return false;
      }
      if (!res.ok) {
        return false;
      }
      if (!data || typeof data.success === 'undefined') {
        return false;
      }
      return !!data.success;
    } catch (e) {
      return false;
    }
  }
}
