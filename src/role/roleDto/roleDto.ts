// create-role.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt, IsEnum } from 'class-validator';
import { DELETED_STATUS } from 'src/enum/enum'; 
import { PaginationDto } from 'src/paginationDto';

export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

}

export class UpdateRoleDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(DELETED_STATUS)
  deleted_status?: DELETED_STATUS;

}

// filter-role.dto.ts

export class FilterRoleDto extends PaginationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(DELETED_STATUS)
  deleted_status?: DELETED_STATUS;
}
