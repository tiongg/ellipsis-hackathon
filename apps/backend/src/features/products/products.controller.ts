import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '@shared-types/features/products/create-product.dto';
import { GetProductsDto } from '@shared-types/features/products/get-products.dto';

import { ProductsService } from './products.service';

//TODO: Authorization here hehe
@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post(':storeId')
  createProduct(
    @Param('storeId') storeId: string,
    @Body() body: CreateProductDto
  ) {
    return this.productsService.createProduct(storeId, body);
  }

  @Get(':storeId')
  getAllProducts(@Param('storeId') storeId: string): Promise<GetProductsDto> {
    return this.productsService.getProducts(storeId);
  }
}
