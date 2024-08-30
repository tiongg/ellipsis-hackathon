import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}
