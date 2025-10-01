import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsDateString, IsEnum } from 'class-validator';
import { booking_status, Chacking_status, Table_status } from '../table_entity/table.entity';
import { DELETED_STATUS } from 'src/enum/enum'; 
import { PaginationDto } from 'src/paginationDto';

export class CreateTableDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

}

export class UpdateTableDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;
  
  @ApiPropertyOptional({examples: ['cloased', 'opened']})
  @IsEnum(Table_status)
  @IsOptional()
  status?: Table_status;

  @ApiPropertyOptional({examples: ['booking', 'not_booking']})
  @IsEnum(booking_status)
  @IsOptional()
  booking_status?: booking_status;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  booking_date?: Date;

  @ApiPropertyOptional({example: ['chacking', 'not_chacking']})
  @IsEnum(Chacking_status)
  @IsOptional()
  chacking_status?: Chacking_status;
}


export class FilterTableDto extends PaginationDto {
  
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({examples: ['cloased', 'opened']})
  @IsEnum(Table_status)
  @IsOptional()
  status?: Table_status;

  @ApiPropertyOptional({examples: ['booking', 'not_booking']})
  @IsEnum(booking_status)
  @IsOptional()
  booking_status?: booking_status;

  @ApiPropertyOptional({examples: ['chacking', 'not_chacking']})
  @IsEnum(Chacking_status)
  @IsOptional()
  chacking_status?: Chacking_status;


}
