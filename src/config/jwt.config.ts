import { registerAs } from '@nestjs/config';

/**
 * JWT配置
 * 定义JWT认证相关的配置参数，包括密钥、过期时间等
 */
export default registerAs('jwt', () => ({
  // JWT密钥，从环境变量获取，默认为开发环境密钥
  secret: process.env.JWT_SECRET || 'your-secret-key',
  // JWT过期时间，从环境变量获取，默认为7天
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  // JWT刷新密钥，从环境变量获取，默认为开发环境刷新密钥
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
  // JWT刷新过期时间，从环境变量获取，默认为30天
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
})); 