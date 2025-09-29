

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
    if (!this.secret) {
      console.error('Captcha validation error: CAPTCHA_SECRET is missing');
      return false;
    }
    const body = new URLSearchParams({ secret: this.secret, response: token });
    if (remoteip) body.append('remoteip', remoteip);

    // Log environment and request details
    console.log('[Captcha] Provider:', this.provider);
    console.log('[Captcha] Endpoint:', this.endpoint());
    console.log('[Captcha] Using secret:', this.secret.slice(0, 6) + '...' + this.secret.slice(-4));
    console.log('[Captcha] Token:', token);
    if (remoteip) console.log('[Captcha] Remote IP:', remoteip);

    try {
      const res = await fetch(this.endpoint(), { method: 'POST', body });
      console.log('[Captcha] HTTP status:', res.status);
      console.log('[Captcha] HTTP headers:', JSON.stringify(Object.fromEntries(res.headers.entries())));
      let data: any = null;
      try {
        data = await res.json();
        console.log('[Captcha] Turnstile API response:', data);
      } catch (jsonErr) {
        const text = await res.text();
        console.error('[Captcha] Error parsing JSON. Raw response:', text);
        return false;
      }
      if (!res.ok) {
        console.error('[Captcha] Bad response status', res.status, data);
        return false;
      }
      if (!data || typeof data.success === 'undefined') {
        console.error('[Captcha] No success field in response:', data);
        return false;
      }
      if (!data.success) {
        console.error('[Captcha] Validation failed. Error codes:', data['error-codes']);
      }
      return !!data.success;
    } catch (e) {
      console.error('[Captcha] Exception during fetch:', e);
      return false;
    }
  }
}
