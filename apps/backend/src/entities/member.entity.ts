import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Account } from './account.entity';

@Entity()
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  memberId!: string;

  @Column({
    nullable: true,
  })
  name: string;

  @OneToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  account!: Account;

  @Column()
  accountId!: string;
}
