import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsEnum, Min } from 'class-validator';
import { DELETED_STATUS } from 'src/enum/enum'; 
import { StopStatus } from '../food.entity';
import { Type } from 'class-transformer';
import { Column } from 'typeorm';
import { PaginationDto } from 'src/paginationDto';



export class CreateFoodDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  typeId: number; // вместо связи — просто передаём id type_menu
}


export class UpdateFoodDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(StopStatus)
  is_stop?: StopStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  typeId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(DELETED_STATUS)
  deleted_status?: DELETED_STATUS;


}

export class FilterFoodDto extends PaginationDto {

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(StopStatus)
  is_stop?: StopStatus;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  typeId?: number;



  // ✅ для пагинации
}
