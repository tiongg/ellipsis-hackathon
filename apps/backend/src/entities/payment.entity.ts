import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  paymentId: string;

  @Column()
  memberId: string;

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
