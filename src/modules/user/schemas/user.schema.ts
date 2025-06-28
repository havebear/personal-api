import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

/**
 * 用户文档类型
 * 结合User类和Mongoose Document类型
 */
export type UserDocument = User & Document;

/**
 * 用户数据模型
 * 定义用户的基本信息结构
 */
@Schema({ timestamps: true })
export class User {
  _id?: Types.ObjectId; // 添加_id属性定义

  @Prop({ required: true, unique: true, lowercase: true })
  email: string; // 用户邮箱，唯一且自动转换为小写

  @Prop({ required: true })
  password: string; // 加密后的密码

  @Prop({ default: Date.now })
  createdAt: Date; // 用户创建时间

  @Prop({ default: null })
  lastLogin: Date; // 最后登录时间
}

/**
 * 用户Schema
 * 基于User类生成的Mongoose Schema
 */
export const UserSchema = SchemaFactory.createForClass(User); 