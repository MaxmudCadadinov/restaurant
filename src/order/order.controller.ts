import { Controller, Post, Body, Get, Param, Delete, Patch, Req, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from './orderDto/createOrderDto'
import { OrderService } from './order.service'
import { DayOpenGuard } from 'src/StatusdayGuards/DayOpenGuard';
import { UpdateOrderDto } from './orderDto/updateOrderDto';


@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService){}

    @UseGuards(DayOpenGuard)
    @Post('/addOrderItems')
    async addOrder(@Body() dto: CreateOrderDto){
        return await this.orderService.addOrder(dto)
    }


    @Patch('/updateOrder/:id')
    async updateOtherInOrder(@Body() dto: UpdateOrderDto, @Param('id', ParseIntPipe) id: string){
        return await this.orderService.updateOtherInOrder(dto, Number(id))
    }

    

}
