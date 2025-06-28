import { IsEmail, IsString, MinLength } from 'class-validator';

/**
 * 用户登录数据传输对象
 * 定义用户登录时需要的参数格式和验证规则
 */
export class LoginDto {
  @IsEmail()
  email: string; // 用户邮箱

  @IsString()
  @MinLength(6)
  password: string; // 用户密码，最少6位
} 