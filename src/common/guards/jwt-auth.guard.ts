import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public-route.decorator';

/**
 * JWT认证守卫
 * 用于保护需要JWT认证的路由，支持公共路由跳过认证
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  /**
   * 检查是否可以激活路由
   * @param context 执行上下文
   * @returns 是否可以访问
   */
  canActivate(context: ExecutionContext) {
    // 检查是否为公共路由
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 如果是公共路由，直接允许访问
    if (isPublic) {
      return true;
    }

    // 否则执行JWT认证
    return super.canActivate(context);
  }

  /**
   * 处理认证请求
   * @param err 错误信息
   * @param user 用户信息
   * @param info 额外信息
   * @returns 用户信息或抛出异常
   */
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid token');
    }
    return user;
  }
} 