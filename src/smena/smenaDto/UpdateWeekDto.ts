import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import { weeks_day, MonthDays } from '../smena.entity';

export class UpdateWeekSmenaDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;
    
  @ApiProperty({ enum: weeks_day, isArray: true, required: false })
  @IsOptional()
  @IsArray()
  @IsEnum(weeks_day, { each: true, message: 'weeks_day must contain only valid weekdays' })
  weeks_day?: weeks_day[];

  @ApiProperty({ example: '09:00' })
    @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'time_start must be in HH:MM format' })
  time_start: string;

  @ApiProperty({ example: '18:00' })
    @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'time_finish must be in HH:MM format' })
  time_finish: string;
}
