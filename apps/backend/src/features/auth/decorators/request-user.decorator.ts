import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { RequestUserType } from '../types/request-user.type';

export const RequestUser =
  createParamDecorator<RequestUserType>(getUserFromRequest);

function getUserFromRequest(data: unknown, context: ExecutionContext) {
  const request = context.switchToHttp().getRequest();
  return request.user as RequestUserType;
}
