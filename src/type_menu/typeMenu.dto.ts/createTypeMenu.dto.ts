import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/paginationDto';

export class CreateTypeMenuDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class FilterTypeMenuDto extends PaginationDto {
  @ApiPropertyOptional({ example: 'Завтраки', description: 'Название типа меню' })
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateTypeMenuDto {
  @ApiPropertyOptional({ example: 'Обеды', description: 'Новое название типа меню' })
  @IsOptional()
  @IsString()
  name?: string;
}