import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {CreateOrderItemOrderDto}  from '../../order_items/orderItemsDto/updateOrderItems.dto'
import { IsOptional, IsInt, IsNumber, IsDateString, IsArray } from 'class-validator';

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
