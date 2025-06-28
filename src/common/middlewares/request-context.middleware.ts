import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

/**
 * 请求上下文中间件
 * 为每个请求添加唯一的请求ID和开始时间，用于请求追踪和性能监控
 */
@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  /**
   * 处理请求并添加上下文信息
   * @param req 请求对象
   * @param res 响应对象
   * @param next 下一个中间件
   */
  use(req: Request, res: Response, next: NextFunction) {
    // 为请求添加唯一ID
    req['requestId'] = uuidv4();
    // 记录请求开始时间
    req['startTime'] = Date.now();
    next();
  }
} 