import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayload } from "src/auth/types";

export const GetCurrentUserId = createParamDecorator(
  (data: undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    const user = request.user as JwtPayload;
    return user.sub;
  }
);
