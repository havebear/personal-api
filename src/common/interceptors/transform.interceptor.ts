import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * 统一响应格式接口
 * 定义所有API响应的标准格式
 */
export interface Response<T> {
  data: T;           // 实际数据
  statusCode: number; // HTTP状态码
  message: string;    // 响应消息
  timestamp: string;  // 时间戳
}

/**
 * 响应转换拦截器
 * 将所有API响应转换为统一的格式，包含状态码、消息和时间戳
 */
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  /**
   * 拦截响应并转换格式
   * @param context 执行上下文
   * @param next 下一个处理器
   * @returns 转换后的响应
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        data,
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: 'Success',
        timestamp: new Date().toISOString(),
      })),
    );
  }
} 