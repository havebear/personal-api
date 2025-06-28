import { registerAs } from '@nestjs/config';

/**
 * 应用配置
 * 定义应用的基本配置参数，包括端口、环境模式、API前缀等
 */
export default registerAs('app', () => ({
  // 应用端口，从环境变量获取，默认为3000
  port: parseInt(process.env.PORT || '3000', 10),
  // 节点环境，从环境变量获取，默认为development
  nodeEnv: process.env.NODE_ENV || 'development',
  // API前缀，从环境变量获取，默认为api
  apiPrefix: process.env.API_PREFIX || 'api',
})); 