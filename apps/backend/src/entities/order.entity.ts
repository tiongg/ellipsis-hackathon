import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Listing } from './listing.entity';
import { Member } from './member.entity';
import { Payment } from './payment.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  orderId: string;

  @OneToOne(() => Listing)
  @JoinColumn({ name: 'listing_id' })
  listing: Listing;

  @Column()
  listingId: string;

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'ordered_by' })
  member: Member;

  @Column()
  orderedBy: string;

  @ManyToOne(() => Payment)
  @JoinColumn({ name: 'payment_id' })
  payment: Payment;

  @Column()
  paymentId: string;
}
