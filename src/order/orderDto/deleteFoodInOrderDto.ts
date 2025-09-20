import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, Validate, ValidateNested } from "class-validator";
import { OrderItemDto } from "src/order_items/orderItemsDto/updateOrderItems.dto"; 




export class DeleteFoodInOrderDto {

    @ApiPropertyOptional({ type: [OrderItemDto]})
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];
}