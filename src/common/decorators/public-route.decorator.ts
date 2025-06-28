import { SetMetadata } from '@nestjs/common';

/**
 * 公共路由元数据键
 * 用于标识不需要JWT认证的公共路由
 */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * 公共路由装饰器
 * 用于标记不需要JWT认证的公共接口
 * 使用方法：@Public()
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true); 