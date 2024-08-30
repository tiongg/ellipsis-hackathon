import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from './product.entity';

@Entity()
export class Listing extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  listingId: string;

  @Column({
    type: 'time without time zone',
    nullable: true,
  })
  soldAt: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  productId: string;
}
