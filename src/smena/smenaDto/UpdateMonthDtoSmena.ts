import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import { weeks_day, MonthDays } from '../smena.entity';

export class UpdateMonthSmenaDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ enum: MonthDays, isArray: true, required: false })
  @IsOptional()
  @IsArray()
  @IsEnum(MonthDays, { each: true, message: 'month_days must contain only valid days (1-31)' })
  month_days?: MonthDays[];

  @ApiProperty({ example: '09:00' })
  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'time_start must be in HH:MM format' })
  time_start: string;

  @ApiProperty({ example: '18:00' })
  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'time_finish must be in HH:MM format' })
  time_finish: string;
}