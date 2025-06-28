import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Diary, DiaryDocument } from './schemas/diary.schema';
import { DiaryRepository } from './repositories/diary.repository';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { PaginationDto } from './dto/pagination.dto';
import { StatsQueryDto } from './dto/stats-query.dto';
import { processDiaryContent, mergeTags, validateDiaryDate } from './utils/diary.utils';
import { getTagStatsAggregation } from './aggregations/tag-stats.aggregation';
import { getOnThisDayAggregation } from './aggregations/on-this-day.aggregation';
import { getWritingFrequencyAggregation } from './aggregations/writing-frequency.aggregation';
import { createPaginationOptions, createPaginationResult } from '../../utils/pagination.util';
import { getMonthDay } from '../../utils/date.util';

/**
 * 日记服务
 * 提供日记相关的业务逻辑处理
 */
@Injectable()
export class DiaryService {
  constructor(
    @InjectModel(Diary.name) private diaryModel: Model<DiaryDocument>,
    private diaryRepository: DiaryRepository,
  ) {}

  /**
   * 创建日记
   * @param userId 用户ID
   * @param createDiaryDto 创建日记的数据
   * @returns 创建的日记对象
   */
  async create(userId: string, createDiaryDto: CreateDiaryDto) {
    const { content, date, tags = [] } = createDiaryDto;
    
    const diaryDate = new Date(date);
    if (!validateDiaryDate(diaryDate)) {
      throw new BadRequestException('Invalid diary date');
    }

    const { extractedTags } = processDiaryContent(content);
    const allTags = mergeTags(tags, extractedTags);

    const diary = await this.diaryRepository.create({
      content,
      date: diaryDate,
      tags: allTags,
      userId: new Types.ObjectId(userId),
    });

    return {
      ...diary.toObject(),
      excerpt: processDiaryContent(content).excerpt,
    };
  }

  /**
   * 获取用户的所有日记（分页）
   * @param userId 用户ID
   * @param paginationDto 分页参数
   * @returns 分页的日记列表
   */
  async findAll(userId: string, paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const options = createPaginationOptions(page, limit);
    
    const { diaries, total } = await this.diaryRepository.findByUser(
      userId,
      options.page,
      options.limit,
    );

    const diariesWithExcerpts = diaries.map(diary => ({
      ...diary.toObject(),
      excerpt: processDiaryContent(diary.content).excerpt,
    }));

    return createPaginationResult(diariesWithExcerpts, total, options);
  }

  /**
   * 根据ID获取单篇日记
   * @param userId 用户ID
   * @param id 日记ID
   * @returns 日记对象
   */
  async findOne(userId: string, id: string) {
    const diary = await this.diaryRepository.findById(id, userId);
    if (!diary) {
      throw new NotFoundException('Diary not found');
    }

    return {
      ...diary.toObject(),
      excerpt: processDiaryContent(diary.content).excerpt,
    };
  }

  /**
   * 更新日记
   * @param userId 用户ID
   * @param id 日记ID
   * @param updateDiaryDto 更新数据
   * @returns 更新后的日记对象
   */
  async update(userId: string, id: string, updateDiaryDto: UpdateDiaryDto) {
    const { content, date, tags } = updateDiaryDto;
    
    if (date) {
      const diaryDate = new Date(date);
      if (!validateDiaryDate(diaryDate)) {
        throw new BadRequestException('Invalid diary date');
      }
    }

    let allTags: string[] = [];
    if (content) {
      const { extractedTags } = processDiaryContent(content);
      allTags = mergeTags(tags || [], extractedTags);
    } else if (tags) {
      allTags = tags;
    }

    const updateData: any = {};
    if (content) updateData.content = content;
    if (date) updateData.date = new Date(date);
    if (allTags.length > 0) updateData.tags = allTags;

    const diary = await this.diaryRepository.update(id, userId, updateData);
    if (!diary) {
      throw new NotFoundException('Diary not found');
    }

    return {
      ...diary.toObject(),
      excerpt: processDiaryContent(diary.content).excerpt,
    };
  }

  /**
   * 删除日记
   * @param userId 用户ID
   * @param id 日记ID
   * @returns 删除结果
   */
  async remove(userId: string, id: string) {
    const deleted = await this.diaryRepository.delete(id, userId);
    if (!deleted) {
      throw new NotFoundException('Diary not found');
    }
    return { message: 'Diary deleted successfully' };
  }

  /**
   * 搜索日记
   * @param userId 用户ID
   * @param query 搜索关键词
   * @param paginationDto 分页参数
   * @returns 分页的搜索结果
   */
  async search(userId: string, query: string, paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const options = createPaginationOptions(page, limit);
    
    const { diaries, total } = await this.diaryRepository.search(
      userId,
      query,
      options.page,
      options.limit,
    );

    const diariesWithExcerpts = diaries.map(diary => ({
      ...diary.toObject(),
      excerpt: processDiaryContent(diary.content).excerpt,
    }));

    return createPaginationResult(diariesWithExcerpts, total, options);
  }

  /**
   * 根据标签查找日记
   * @param userId 用户ID
   * @param tags 标签数组
   * @param paginationDto 分页参数
   * @returns 分页的日记列表
   */
  async findByTags(userId: string, tags: string[], paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const options = createPaginationOptions(page, limit);
    
    const { diaries, total } = await this.diaryRepository.findByTags(
      userId,
      tags,
      options.page,
      options.limit,
    );

    const diariesWithExcerpts = diaries.map(diary => ({
      ...diary.toObject(),
      excerpt: processDiaryContent(diary.content).excerpt,
    }));

    return createPaginationResult(diariesWithExcerpts, total, options);
  }

  /**
   * 获取用户的所有标签
   * @param userId 用户ID
   * @returns 标签数组
   */
  async getTags(userId: string) {
    return this.diaryRepository.getTagsByUser(userId);
  }

  /**
   * 获取标签统计信息
   * @param userId 用户ID
   * @returns 标签统计结果
   */
  async getTagStats(userId: string) {
    const aggregation = getTagStatsAggregation(userId);
    return this.diaryModel.aggregate(aggregation).exec();
  }

  /**
   * 获取那年今日的日记
   * @param userId 用户ID
   * @param date 目标日期
   * @returns 那年今日的日记列表
   */
  async getOnThisDay(userId: string, date: Date) {
    const { month, day } = getMonthDay(date);
    const currentYear = date.getFullYear();
    
    const aggregation = getOnThisDayAggregation(userId, month, day, currentYear);
    return this.diaryModel.aggregate(aggregation).exec();
  }

  /**
   * 获取写作频率统计
   * @param userId 用户ID
   * @param statsQueryDto 统计查询参数
   * @returns 写作频率统计结果
   */
  async getWritingFrequency(userId: string, statsQueryDto: StatsQueryDto) {
    const { startDate, endDate, frequency = 'daily' } = statsQueryDto;
    
    const start = startDate ? new Date(startDate) : new Date(new Date().getFullYear(), 0, 1);
    const end = endDate ? new Date(endDate) : new Date();
    
    const aggregation = getWritingFrequencyAggregation(userId, start, end, frequency);
    return this.diaryModel.aggregate(aggregation).exec();
  }
} 