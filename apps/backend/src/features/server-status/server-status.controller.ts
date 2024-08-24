import { Controller, Get } from '@nestjs/common';

import { ServerStatusService } from './server-status.service';

@Controller('server-status')
export class ServerStatusController {
  constructor(private readonly serverStatusService: ServerStatusService) {}

  @Get('status')
  getStatus() {
    return this.serverStatusService.getServerStatus();
  }

  @Get('version')
  getVersion() {
    return this.serverStatusService.getVersion();
  }

  @Get('database-status')
  getDatabaseStatus() {
    return this.serverStatusService.getDatabaseStatus();
  }
}
