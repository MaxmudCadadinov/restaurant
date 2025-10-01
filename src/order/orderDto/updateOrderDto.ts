import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {CreateOrderItemOrderDto}  from '../../order_items/orderItemsDto/updateOrderItems.dto'
import { IsOptional, IsInt, IsNumber, IsDateString, IsArray, Min } from 'class-validator';
import { PaginationDto } from 'src/paginationDto';

export class UpdateOrderDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  table_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  worker_id?: number;
}


export class FilterOrderDto extends PaginationDto{
  @ApiPropertyOptional({ example: 1, description: 'ID стола' })
  @IsOptional()
  @IsNumber()
  tableId?: number;

  @ApiPropertyOptional({ example: 2, description: 'ID сотрудника (официанта)' })
  @IsOptional()
  @IsNumber()
  workerId?: number;

  @ApiPropertyOptional({ example: '2025-09-30', description: 'Дата создания заказа (с)' })
  @IsOptional()
  @IsDateString()
  createdFrom?: string;

  @ApiPropertyOptional({ example: '2025-09-30', description: 'Дата создания заказа (по)' })
  @IsOptional()
  @IsDateString()
  createdTo?: string;

  @ApiPropertyOptional({ example: '2999', description: 'Сумма заказа' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minSumm?: string;

  @ApiPropertyOptional({ example: '2999', description: 'Сумма заказа' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxSumm?: string;
}
