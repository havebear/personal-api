import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';

/**
 * 用户服务
 * 提供用户相关的业务逻辑处理
 */
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * 创建新用户
   * @param email 用户邮箱
   * @param password 用户密码
   * @returns 创建的用户对象
   */
  async createUser(email: string, password: string): Promise<User> {
    // 检查邮箱是否已存在
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // 对密码进行加密
    const hashedPassword = await bcrypt.hash(password, 12);
    return this.userRepository.create({
      email,
      password: hashedPassword,
    });
  }

  /**
   * 根据邮箱查找用户
   * @param email 用户邮箱
   * @returns 用户对象或null
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  /**
   * 根据ID查找用户
   * @param id 用户ID
   * @returns 用户对象或null
   */
  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  /**
   * 更新用户最后登录时间
   * @param id 用户ID
   */
  async updateLastLogin(id: string): Promise<void> {
    await this.userRepository.updateLastLogin(id);
  }

  /**
   * 验证用户密码
   * @param user 用户对象
   * @param password 待验证的密码
   * @returns 密码是否正确
   */
  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  /**
   * 更新用户密码
   * @param id 用户ID
   * @param newPassword 新密码
   */
  async updatePassword(id: string, newPassword: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await this.userRepository.updatePassword(id, hashedPassword);
  }

  /**
   * 删除用户
   * @param id 用户ID
   */
  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(id);
  }
} 