import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';

import { Member } from './member.entity';
import { Store } from './store.entity';

// Currently unused
export enum MembershipRole {
  Owner = 'Owner',
  Admin = 'Admin',
  Member = 'Member',
}

/**
 * Stores the relation between user and store
 *
 * Used to determine if a user is a member of a store, and
 * has access to the store's resources.
 *
 * Currently it is 1-1, but it could be expanded to many-many to allow
 * for users to be members of multiple stores
 */
@Entity()
export class StoreMembership extends BaseEntity {
  @OneToOne(() => Member, (member) => member.membership)
  @JoinColumn({ name: 'member_id' })
  member!: Member;

  @RelationId((membership: StoreMembership) => membership.member)
  @PrimaryColumn()
  memberId!: string;

  @ManyToOne(() => Store, (store) => store.memberships, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'store_id' })
  store!: Store;

  @RelationId((membership: StoreMembership) => membership.store)
  @PrimaryColumn()
  storeId!: string;

  @Column({
    type: 'simple-enum',
    enum: MembershipRole,
  })
  role!: MembershipRole;
}
