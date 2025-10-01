import { Controller, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateOrderItemOrderDto } from '../order_items/orderItemsDto/updateOrderItems.dto'
import { OrderItemsService } from './order_items.service'
import { Repository } from 'typeorm';

@Controller('order-items')
export class OrderItemsController {
    constructor(
        private readonly orderItemsService: OrderItemsService
    ){}



    @Patch('/start_cooking/:order_itemID')
    async start_cooking(@Param('order_itemID', ParseIntPipe) order_itemID: number){
        return await this.orderItemsService.start_cooking(order_itemID)
    }

    @Patch('/finish_cooking/:order_itemID')
    async finish_cooking(@Param('order_itemID', ParseIntPipe) order_itemID: number){
        return await this.orderItemsService.finish_cooking(order_itemID)
    }
}
