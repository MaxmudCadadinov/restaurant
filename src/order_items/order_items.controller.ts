import { Controller, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateOrderItemOrderDto } from '../order_items/orderItemsDto/updateOrderItems.dto'
import { OrderItemsService } from './order_items.service'

@Controller('order-items')
export class OrderItemsController {
    constructor(
        private readonly orderItemsService: OrderItemsService
    ){}



    @Patch('/updateInOrderItems/:id')
    async updateOrderItems(@Body() dto: CreateOrderItemOrderDto, @Param('id', ParseIntPipe) id: string){
        return await this.orderItemsService.updateOrderItems(dto, Number(id))
    }

    @Delete('/deleteInOrderItem/:id')
    async deleteInOrderItems(@Body() dto: CreateOrderItemOrderDto, @Param('id', ParseIntPipe) id: string){
        return await this.orderItemsService.deleteInOrderItems(dto, Number(id))
    }

}
