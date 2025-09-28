import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      status: 'ok',
      message: 'Welcome to the Rumpke AI Backend. The API is running and ready to receive requests.',
      version: process.env.npm_package_version || 'unknown',
      timestamp: new Date().toISOString(),
    };
  }
}
