import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Order } from './order.entity';

@Entity()
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  paymentId: string;

  @Column()
  memberId: string;

  @OneToMany(() => Order, (order) => order.payment)
  orders: Order[];

  @Column({
    nullable: true,
  })
  stripePaymentId: string;

  @Column({
    nullable: true,
    type: 'int',
  })
  amountSubtotal: number;

  @Column({
    nullable: true,
    type: 'int',
  })
  amountTotal: number;

  @Column({
    nullable: true,
    type: 'int',
  })
  createdTime: number;

  @Column({
    nullable: true,
  })
  currency: string;

  @Column({
    nullable: true,
  })
  customerName: string;

  @Column({
    nullable: true,
  })
  customerEmail: string;

  @Column({
    default: 'pending',
  })
  paymentStatus: string;

  @Column({
    nullable: true,
  })
  statusDetails: string;
}
