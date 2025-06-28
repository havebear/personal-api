import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

/**
 * 认证服务
 * 提供用户注册、登录、JWT签发等认证相关功能
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user && (await this.userService.validatePassword(user, password))) {
      if (user._id) {
        await this.userService.updateLastLogin(user._id.toString());
      }
      return user;
    }
    return null;
  }

  /**
   * 用户注册
   * @param registerDto 注册信息
   * @returns 注册结果
   */
  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;
    
    // 创建用户
    const user = await this.userService.createUser(email, password);
    
    // 更新最后登录时间
    if (user._id) {
      await this.userService.updateLastLogin(user._id.toString());
    }

    // 生成JWT令牌
    const payload: JwtPayload = {
      sub: user._id?.toString() || '',
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user._id,
        email: user.email,
      },
    };
  }

  /**
   * 用户登录
   * @param loginDto 登录信息
   * @returns 登录结果
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    
    // 查找用户
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 验证密码
    const isPasswordValid = await this.userService.validatePassword(user, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 更新最后登录时间
    if (user._id) {
      await this.userService.updateLastLogin(user._id.toString());
    }

    // 生成JWT令牌
    const payload: JwtPayload = {
      sub: user._id?.toString() || '',
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user._id,
        email: user.email,
      },
    };
  }

  /**
   * 获取当前用户信息
   * @param userId 用户ID
   * @returns 用户信息
   */
  async getProfile(userId: string) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user._id,
      email: user.email,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
    };
  }
} 