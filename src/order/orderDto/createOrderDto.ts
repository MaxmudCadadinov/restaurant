import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsEnum, IsDateString, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDto } from '../../order_items/orderItemsDto/updateOrderItems.dto'


export class CreateOrderDto {

@ApiPropertyOptional()
@IsOptional()
@IsNumber()
order_id: number
@ApiPropertyOptional()
@IsOptional()
@IsNumber()
table_id: number; 
@ApiPropertyOptional() 
@IsOptional()               
@IsNumber()
worker_id: number;  
@ApiPropertyOptional({type: [OrderItemDto], description: 'Список продуктов в заказе'})                                    
@IsArray()         
@Type(() => OrderItemDto)         
items: OrderItemDto[];        
}