import { Injectable } from '@nestjs/common';

@Injectable()
export class ServerStatusService {
  constructor() {}

  getServerStatus() {
    return {
      status: 'Alive!',
    };
  }

  getVersion() {
    return {
      version: process.env.VERSION,
    };
  }
}
