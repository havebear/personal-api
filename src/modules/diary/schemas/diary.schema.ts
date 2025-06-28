import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

/**
 * 日记文档类型
 * 结合Diary类和Mongoose Document类型
 */
export type DiaryDocument = Diary & Document;

/**
 * 日记数据模型
 * 定义日记的基本信息结构
 */
@Schema({ timestamps: true })
export class Diary {
  _id?: Types.ObjectId; // 添加_id属性定义

  @Prop({ required: true })
  content: string; // 日记内容

  @Prop({ required: true, type: Date })
  date: Date; // 日记日期

  @Prop({ type: [String], default: [] })
  tags: string[]; // 标签数组

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId; // 用户ID，关联到User集合

  @Prop({ default: Date.now })
  createdAt: Date; // 创建时间

  @Prop({ default: Date.now })
  updatedAt: Date; // 更新时间

  // 添加toObject方法
  toObject(): any {
    const obj = this.toObject();
    return {
      _id: this._id,
      content: this.content,
      date: this.date,
      tags: this.tags,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

/**
 * 日记Schema
 * 基于Diary类生成的Mongoose Schema
 */
export const DiarySchema = SchemaFactory.createForClass(Diary);

// 创建索引
DiarySchema.index({ userId: 1, date: -1 });
DiarySchema.index({ userId: 1, tags: 1 });
DiarySchema.index({ date: 1 }); 