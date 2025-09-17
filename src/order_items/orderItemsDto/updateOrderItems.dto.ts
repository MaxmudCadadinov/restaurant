import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { IsArray, ValidateNested } from 'class-validator';


export class OrderItemDto {
    @ApiPropertyOptional()
    food_id: number;  
    @ApiPropertyOptional()
    quantity: number;    
}


export class CreateOrderItemOrderDto {
  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}




