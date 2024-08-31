import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Store } from './store.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  productId: string;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @Column()
  storeId: string;

  @Column()
  productName: string;

  @Column()
  productDescription: string;

  @Column()
  productImageUrl: string;

  @Column()
  productCategory: string;

  @Column({
    type: 'numeric',
  })
  productPrice: number;

  @Column({
    type: 'numeric',
  })
  productWeight: number;
}
