import { IsString, IsDateString, IsOptional, IsArray } from 'class-validator';

export class UpdateDiaryDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
} 