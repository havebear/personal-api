import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Diary, DiarySchema } from './schemas/diary.schema';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';
import { DiaryRepository } from './repositories/diary.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Diary.name, schema: DiarySchema }]),
  ],
  controllers: [DiaryController],
  providers: [DiaryService, DiaryRepository],
  exports: [DiaryService, DiaryRepository],
})
export class DiaryModule {} 