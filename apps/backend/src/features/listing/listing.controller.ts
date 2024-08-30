import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetListingDto } from '@shared-types/features/listing/get-listing.dto';
import { OpenShopDto } from '@shared-types/features/listing/open-shop.dto';

import { ListingService } from './listing.service';

@Controller('listing')
@ApiTags('Listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  /*
   Route is kinda weird here.
  Technically since product is already linked with shop, we can just
  create a listing, and it links to the shop.
  But closing shop we need the shopId, since listings might
  be gone (i.e sold).

  Note that 'emptying' out a store automatically closes it.
   */
  //TODO: Authorization here
  @Post('open')
  createListing(@Body() dto: OpenShopDto) {
    return this.listingService.openShop(dto);
  }

  @Post(':storeId/close')
  closeShop(@Param('shopId') storeId: string) {
    return this.listingService.closeShop(storeId);
  }

  @Get()
  getAllListings(@Query('storeId') storeId?: string): Promise<GetListingDto> {
    if (!storeId) {
      return this.listingService.getAllListings();
    } else {
      return this.listingService.getAllStoreListings(storeId);
    }
  }

  @Delete(':listingId')
  deleteListing(@Param('listingId') listingId: string) {
    return this.listingService.removeListing(listingId);
  }
}
