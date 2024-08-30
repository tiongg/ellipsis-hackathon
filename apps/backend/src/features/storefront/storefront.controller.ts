import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateStorefrontDto } from '@shared-types/features/storefront/create-storefront.dto';
import { GetStorefrontsDto } from '@shared-types/features/storefront/get-storefronts.dto';

import { RequestUser } from '../auth/decorators/request-user.decorator';
import { RequestUserType } from '../auth/types/request-user.type';
import { StorefrontService } from './storefront.service';

@ApiTags('Storefront')
@Controller('storefront')
export class StorefrontController {
  constructor(private readonly storefrontService: StorefrontService) {}

  @Post()
  createStorefront(
    @RequestUser() user: RequestUserType,
    @Body() dto: CreateStorefrontDto
  ) {
    //Should never happen, but just in case
    if (!user.member) {
      throw new UnauthorizedException('Please log in to continue');
    }
    return this.storefrontService.createStorefront(user.member.memberId, dto);
  }

  @Get()
  getUsersStorefront(
    @RequestUser() user: RequestUserType
  ): Promise<GetStorefrontsDto> {
    if (!user.member) {
      throw new UnauthorizedException('Please log in to continue');
    }
    return this.storefrontService.getUsersStorefront(user.member.memberId);
  }
}
