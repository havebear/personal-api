import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

/**
 * 用户注册数据传输对象
 * 定义用户注册时需要的参数格式和验证规则
 */
export class RegisterDto {
  @IsEmail()
  email: string; // 用户邮箱

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string; // 用户密码，6-50位
} 