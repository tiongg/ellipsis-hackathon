import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '@shared-types/features/products/create-product.dto';
import { Repository } from 'typeorm';

import { Product } from '@backend/entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async createProduct(storeId: string, dto: CreateProductDto) {
    const {
      productDescription,
      productName,
      productPrice,
      productWeight,
      productImageUrl,
    } = dto;
    await this.productRepository.save({
      productDescription,
      productName,
      productPrice,
      productWeight,
      productImageUrl,
      storeId,
    });
  }

  async getProducts(storeId: string) {
    return this.productRepository.find({
      where: {
        storeId,
      },
    });
  }
}
