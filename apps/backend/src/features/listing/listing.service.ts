import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpenShopDto } from '@shared-types/features/listing/open-shop.dto';
import _ from 'lodash';
import { IsNull, Repository } from 'typeorm';

import { Listing } from '@backend/entities/listing.entity';

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>
  ) {}

  //TODO: In range
  async getAllListings() {
    return this.listingRepository.find({
      relations: {
        product: {
          store: true,
        },
      },
    });
  }

  /**
   * Creates listings for a store, and 'opens' the store
   * @param listings - Listing information
   */
  async openShop(listings: OpenShopDto) {
    return this.listingRepository.save(
      listings.flatMap(({ productId, quantity }) =>
        _.range(quantity).map(() => ({
          productId,
          createdAt: new Date(),
        }))
      )
    );
  }

  /**
   * Removes unsold listings for a store, and 'closes' the store
   * @param storeId - Store to close
   * @returns
   */
  async closeShop(storeId: string) {
    await this.listingRepository.delete({
      product: {
        storeId,
      },
      soldAt: IsNull(),
    });
  }
}
