import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Member } from './member.entity';

/**
 * Account entity
 *
 * Stores information about account login information
 *
 * Adding of new login providers should be done here
 */
@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  accountId!: string;

  @Column({ nullable: true })
  googleId?: string;

  @Column({ nullable: true })
  sgid?: string;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;

  @DeleteDateColumn()
  deletedDate!: Date;

  @OneToOne(() => Member, (member) => member.account, { nullable: true })
  member: Member;
}
