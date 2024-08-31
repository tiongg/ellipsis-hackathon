import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Public } from '../decorators/public-route.decorator';
import { AdminService } from './admin.service';

@Controller('admin')
@ApiTags('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Public('dev')
  @Get('seed-mock-data')
  async seedStoresAndProducts() {
    return this.adminService.seedMockData();
  }

  @Public('dev')
  @Get('seed-listings')
  async seedListings() {
    return this.adminService.seedListings();
  }
}
