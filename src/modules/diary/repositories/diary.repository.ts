import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Diary, DiaryDocument } from '../schemas/diary.schema';

@Injectable()
export class DiaryRepository {
  constructor(
    @InjectModel(Diary.name) private diaryModel: Model<DiaryDocument>,
  ) {}

  async create(diaryData: Partial<Diary>): Promise<Diary> {
    const diary = new this.diaryModel(diaryData);
    return diary.save();
  }

  async findById(id: string, userId: string): Promise<Diary | null> {
    return this.diaryModel.findOne({
      _id: id,
      userId: new Types.ObjectId(userId),
    }).exec();
  }

  async findByUser(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ diaries: Diary[]; total: number }> {
    const skip = (page - 1) * limit;
    
    const [diaries, total] = await Promise.all([
      this.diaryModel
        .find({ userId: new Types.ObjectId(userId) })
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.diaryModel
        .countDocuments({ userId: new Types.ObjectId(userId) })
        .exec(),
    ]);

    return { diaries, total };
  }

  async findByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Diary[]> {
    return this.diaryModel
      .find({
        userId: new Types.ObjectId(userId),
        date: { $gte: startDate, $lte: endDate },
      })
      .sort({ date: -1 })
      .exec();
  }

  async findByTags(
    userId: string,
    tags: string[],
    page: number = 1,
    limit: number = 10,
  ): Promise<{ diaries: Diary[]; total: number }> {
    const skip = (page - 1) * limit;
    
    const [diaries, total] = await Promise.all([
      this.diaryModel
        .find({
          userId: new Types.ObjectId(userId),
          tags: { $in: tags },
        })
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.diaryModel
        .countDocuments({
          userId: new Types.ObjectId(userId),
          tags: { $in: tags },
        })
        .exec(),
    ]);

    return { diaries, total };
  }

  async search(
    userId: string,
    query: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ diaries: Diary[]; total: number }> {
    const skip = (page - 1) * limit;
    
    const [diaries, total] = await Promise.all([
      this.diaryModel
        .find({
          userId: new Types.ObjectId(userId),
          $text: { $search: query },
        })
        .sort({ score: { $meta: 'textScore' } })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.diaryModel
        .countDocuments({
          userId: new Types.ObjectId(userId),
          $text: { $search: query },
        })
        .exec(),
    ]);

    return { diaries, total };
  }

  async update(id: string, userId: string, updateData: Partial<Diary>): Promise<Diary | null> {
    return this.diaryModel
      .findOneAndUpdate(
        { _id: id, userId: new Types.ObjectId(userId) },
        { ...updateData, updatedAt: new Date() },
        { new: true },
      )
      .exec();
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const result = await this.diaryModel
      .deleteOne({
        _id: id,
        userId: new Types.ObjectId(userId),
      })
      .exec();
    
    return result.deletedCount > 0;
  }

  async getTagsByUser(userId: string): Promise<string[]> {
    const result = await this.diaryModel
      .aggregate([
        { $match: { userId: new Types.ObjectId(userId) } },
        { $unwind: '$tags' },
        { $group: { _id: '$tags' } },
        { $sort: { _id: 1 } },
      ])
      .exec();
    
    return result.map(item => item._id);
  }
} 