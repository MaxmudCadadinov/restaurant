import { IsNotEmpty, IsOptional, IsNumber, IsDate, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDayDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  administrator_id: number; // id администратора, который открыл день
}
