/**
 * JWT载荷接口
 * 定义JWT令牌中包含的用户信息结构
 */
export interface JwtPayload {
  sub: string;    // 用户ID（subject）
  email: string;  // 用户邮箱
  iat?: number;   // 令牌签发时间（issued at）
  exp?: number;   // 令牌过期时间（expiration time）
} 