import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/**
 * 角色守卫
 * 用于检查用户是否具有访问特定路由所需的角色权限
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * 检查是否可以激活路由
   * @param context 执行上下文
   * @returns 是否可以访问
   */
  canActivate(context: ExecutionContext): boolean {
    // 获取路由所需的角色
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // 如果没有设置角色要求，则允许访问
    if (!requiredRoles) {
      return true;
    }

    // 获取请求中的用户信息
    const { user } = context.switchToHttp().getRequest();
    // 检查用户是否具有所需角色中的任意一个
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
} 