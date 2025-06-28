import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

/**
 * 用户数据仓库
 * 负责用户数据的增删改查操作
 */
@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  /**
   * 创建新用户
   * @param userData 用户数据
   * @returns 创建的用户对象
   */
  async create(userData: Partial<User>): Promise<User> {
    const user = new this.userModel(userData);
    return user.save();
  }

  /**
   * 根据邮箱查找用户
   * @param email 用户邮箱
   * @returns 用户对象或null
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email: email.toLowerCase() }).exec();
  }

  /**
   * 根据ID查找用户
   * @param id 用户ID
   * @returns 用户对象或null
   */
  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  /**
   * 更新用户最后登录时间
   * @param id 用户ID
   */
  async updateLastLogin(id: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, {
      lastLogin: new Date(),
    });
  }

  /**
   * 更新用户密码
   * @param id 用户ID
   * @param hashedPassword 加密后的新密码
   */
  async updatePassword(id: string, hashedPassword: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, {
      password: hashedPassword,
    });
  }

  /**
   * 删除用户
   * @param id 用户ID
   */
  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
  }
} 