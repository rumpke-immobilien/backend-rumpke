

import { Injectable } from '@nestjs/common';

type Provider = 'turnstile' | 'hcaptcha' | 'recaptcha';

@Injectable()
export class CaptchaService {
  private provider: Provider = (process.env.CAPTCHA_PROVIDER as Provider) || 'turnstile';
  private secret = process.env.CAPTCHA_SECRET || '';

  private endpoint() {
    switch (this.provider) {
      case 'hcaptcha': return 'https://hcaptcha.com/siteverify';
      case 'recaptcha': return 'https://www.google.com/recaptcha/api/siteverify';
      default: return 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    }
  }

  async verify(token: string, remoteip?: string): Promise<boolean> {
    if (!this.secret) return false;
    const body = new URLSearchParams({ secret: this.secret, response: token });
    if (remoteip) body.append('remoteip', remoteip);

    try {
      const res = await fetch(this.endpoint(), { method: 'POST', body });
      if (!res.ok) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('Captcha verification failed: Bad response status', res.status);
        }
        return false;
      }
      const data = await res.json();
      // Log the full response from Turnstile for debugging
      console.log('Turnstile API response:', data);
      return !!data.success;
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Captcha verification error:', e);
      }
      return false;
    }
  }
}
