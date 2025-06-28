import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DiaryService } from './diary.service';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { PaginationDto } from './dto/pagination.dto';
import { StatsQueryDto } from './dto/stats-query.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('diary')
@UseGuards(JwtAuthGuard)
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Post()
  create(@CurrentUser() user: any, @Body() createDiaryDto: CreateDiaryDto) {
    return this.diaryService.create(user._id, createDiaryDto);
  }

  @Get()
  findAll(@CurrentUser() user: any, @Query() paginationDto: PaginationDto) {
    return this.diaryService.findAll(user._id, paginationDto);
  }

  @Get('search')
  search(
    @CurrentUser() user: any,
    @Query('q') query: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.diaryService.search(user._id, query, paginationDto);
  }

  @Get('tags')
  getTags(@CurrentUser() user: any) {
    return this.diaryService.getTags(user._id);
  }

  @Get('tags/:tags')
  findByTags(
    @CurrentUser() user: any,
    @Param('tags') tags: string,
    @Query() paginationDto: PaginationDto,
  ) {
    const tagArray = tags.split(',').map(tag => tag.trim());
    return this.diaryService.findByTags(user._id, tagArray, paginationDto);
  }

  @Get('stats/tags')
  getTagStats(@CurrentUser() user: any) {
    return this.diaryService.getTagStats(user._id);
  }

  @Get('stats/frequency')
  getWritingFrequency(
    @CurrentUser() user: any,
    @Query() statsQueryDto: StatsQueryDto,
  ) {
    return this.diaryService.getWritingFrequency(user._id, statsQueryDto);
  }

  @Get('on-this-day')
  getOnThisDay(@CurrentUser() user: any, @Query('date') date: string) {
    const targetDate = date ? new Date(date) : new Date();
    return this.diaryService.getOnThisDay(user._id, targetDate);
  }

  @Get(':id')
  findOne(@CurrentUser() user: any, @Param('id') id: string) {
    return this.diaryService.findOne(user._id, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() updateDiaryDto: UpdateDiaryDto,
  ) {
    return this.diaryService.update(user._id, id, updateDiaryDto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: any, @Param('id') id: string) {
    return this.diaryService.remove(user._id, id);
  }
} 