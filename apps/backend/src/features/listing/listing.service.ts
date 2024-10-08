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
      where: {
        soldAt: IsNull(),
      },
      relations: {
        product: {
          store: true,
        },
      },
    });
  }

  /**
   * All listings for a given store
   * @param storeId - Store to get listings for
   */
  async getAllStoreListings(storeId: string) {
    return this.listingRepository.find({
      where: {
        product: {
          storeId,
        },
        soldAt: IsNull(),
      },
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

  /**
   * Manually remove listing
   * @param listingId - Listing to remove
   */
  async removeListing(listingId: string) {
    await this.listingRepository.delete(listingId);
  }

  /**
   * Get available listings for a product
   * @param productId - Product to get listings for
   * @param quantity - Number of listings to get
   */
  async getAvailableListings(productId: string, quantity: number) {
    return this.listingRepository.find({
      where: {
        productId,
        soldAt: IsNull(),
      },
      relations: {
        product: true,
      },
      take: quantity,
    });
  }

  /**
   * Mark a listing as sold
   * @param listings - Listing to mark as sold
   */
  async markListingsAsSold(listings: string[]) {
    await this.listingRepository.update(listings, {
      soldAt: 'NOW()',
    });
  }
}
