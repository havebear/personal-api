import { IsString, IsDateString, IsOptional, IsArray } from 'class-validator';

export class CreateDiaryDto {
  @IsString()
  content: string;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
} 