import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * 当前用户装饰器
 * 用于从请求中提取当前认证用户信息
 * 使用方法：@CurrentUser() user: User
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // 获取HTTP请求对象
    const request = ctx.switchToHttp().getRequest();
    // 返回请求中的用户信息（由JWT守卫设置）
    return request.user;
  },
); 