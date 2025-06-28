import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * HTTP异常过滤器
 * 统一处理所有HTTP异常，提供标准化的错误响应格式
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * 捕获异常并处理
   * @param exception 异常对象
   * @param host 执行上下文
   */
  catch(exception: unknown, host: ArgumentsHost) {
    // 获取HTTP上下文
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // 确定HTTP状态码
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // 获取错误消息
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // 返回标准化的错误响应
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: typeof message === 'string' ? message : (message as any).message,
    });
  }
} 