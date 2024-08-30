import { Member } from '@backend/entities/member.entity';

export type RequestUserType = {
  accountId: string;
  member?: Member;
};
