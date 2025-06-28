import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * 日志拦截器
 * 记录所有HTTP请求的日志信息，包括请求开始和响应时间
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  /**
   * 拦截请求并记录日志
   * @param context 执行上下文
   * @param next 下一个处理器
   * @returns 可观察对象
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 获取请求信息
    const request = context.switchToHttp().getRequest();
    const { method, url, body } = request;
    const now = Date.now();

    // 记录请求开始日志
    this.logger.log(`${method} ${url} - Request started`);

    // 处理请求并记录响应时间
    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        this.logger.log(`${method} ${url} - ${responseTime}ms`);
      }),
    );
  }
} 