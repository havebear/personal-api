import { IsOptional, IsDateString, IsString, IsIn } from 'class-validator';

export class StatsQueryDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  @IsIn(['daily', 'weekly', 'monthly'])
  frequency?: 'daily' | 'weekly' | 'monthly' = 'daily';
} 