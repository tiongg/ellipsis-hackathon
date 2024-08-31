import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Repository } from 'typeorm';

import { Listing } from '@backend/entities/listing.entity';
import { Product } from '@backend/entities/product.entity';
import { Store } from '@backend/entities/store.entity';
import { products, stores } from './mock-data';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>
  ) {}

  /**
   * Seeds data for development purposes
   *
   * Be careful for production.
   *
   * This takes awhile to run...
   */
  async seedMockData() {
    for (const store of stores) {
      const { description, postalCode, storeId, storeName } = store;
      await this.storeRepository.save({
        description,
        postalCode,
        storeId,
        storeName,
        longitude: 0,
        latitude: 0,
        storeUrl: '',
        receivingBankAccount: '',
      });
    }

    for (const product of products) {
      const {
        belongsToStoreId,
        productCategory,
        productDescription,
        productImageUrl,
        productName,
        productPrice,
        productWeight,
      } = product;
      await this.productRepository.save({
        storeId: belongsToStoreId,
        productCategory,
        productDescription,
        productImageUrl,
        productName,
        productPrice,
        productWeight,
      });
    }
  }

  /**
   * Seeds listings for development purposes
   */
  async seedListings() {
    const products = await this.productRepository.find();
    const listings = products.flatMap((product) =>
      _.range(10).map(() => ({ productId: product.productId }))
    );
    await this.listingRepository.save(listings);
  }
}
