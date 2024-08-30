import { Controller, Get } from '@nestjs/common';

import { Public } from '../auth/decorators/public-route.decorator';
import { ServerStatusService } from './server-status.service';

@Controller('server-status')
export class ServerStatusController {
  constructor(private readonly serverStatusService: ServerStatusService) {}

  @Get('status')
  @Public()
  getStatus() {
    return this.serverStatusService.getServerStatus();
  }

  @Get('version')
  @Public()
  getVersion() {
    return this.serverStatusService.getVersion();
  }

  @Get('database-status')
  @Public()
  getDatabaseStatus() {
    return this.serverStatusService.getDatabaseStatus();
  }
}
