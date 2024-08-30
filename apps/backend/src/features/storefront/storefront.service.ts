import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CreateStorefrontDto } from '@shared-types/features/storefront/create-storefront.dto';
import { DataSource, Repository } from 'typeorm';

import {
  MembershipRole,
  StoreMembership,
} from '@backend/entities/store-membership.entity';
import { Store } from '@backend/entities/store.entity';
import { postalCodeToLongLat } from '@backend/utils/postal-code-helper';

@Injectable()
export class StorefrontService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @InjectRepository(StoreMembership)
    private readonly storeMembershipRepository: Repository<StoreMembership>
  ) {}

  async createStorefront(creatorMemberId: string, dto: CreateStorefrontDto) {
    const {
      description,
      storeName,
      receivingBankAccount,
      storeUrl,
      postalCode,
    } = dto;
    const { longitude, latitude } = await postalCodeToLongLat(postalCode);

    this.dataSource.transaction(async (manager) => {
      const store = await manager.save(Store, {
        description,
        storeName,
        receivingBankAccount,
        storeUrl,
        longitude,
        latitude,
        postalCode,
      });
      const membership = await manager.save(StoreMembership, {
        memberId: creatorMemberId,
        storeId: store.storeId,
        role: MembershipRole.Owner,
      });
    });
  }

  /**
   * Returns a list of storefronts that the user is a member of
   * @param memberId - Member id finding the storefronts for
   */
  async getUsersStorefront(memberId: string) {
    const memberships = await this.storeMembershipRepository.find({
      where: {
        memberId,
      },
      relations: {
        store: true,
      },
    });
    return memberships.map((x) => x.store);
  }

  getStoreDetails(storeId: string) {
    return this.storeRepository.findOneBy({ storeId });
  }
}
