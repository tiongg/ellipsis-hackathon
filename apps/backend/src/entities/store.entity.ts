import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { StoreMembership } from './store-membership.entity';

@Entity()
export class Store extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  storeId: string;

  @Column()
  storeName: string;

  @Column()
  description: string;

  @Column()
  storeUrl: string;

  @Column()
  receivingBankAccount: string;

  @Column({
    type: 'double precision',
  })
  longitude: number;

  @Column({
    type: 'double precision',
  })
  latitude: number;

  @Column()
  postalCode: string;

  @OneToMany(() => StoreMembership, (membership) => membership.store, {
    onDelete: 'CASCADE',
    cascade: ['remove'],
  })
  memberships!: StoreMembership[];
}
