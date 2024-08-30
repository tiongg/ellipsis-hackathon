import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Account } from './account.entity';
import { StoreMembership } from './store-membership.entity';

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

  @OneToOne(() => StoreMembership, (membership) => membership.member, {
    nullable: true,
  })
  membership?: StoreMembership;
}
