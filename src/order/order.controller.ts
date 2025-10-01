import { Controller, Post, Body, Get, Param, Delete, Patch, Req, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from './orderDto/createOrderDto'
import { OrderService } from './order.service'
import { DayOpenGuard } from 'src/guards/DayOpenGuard';  
import { FilterOrderDto, UpdateOrderDto } from './orderDto/updateOrderDto';
import { DeleteFoodInOrderDto } from './orderDto/deleteFoodInOrderDto';
import { JwtGuard } from 'src/guards/GuardJwtToken';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService){}

    @UseGuards(JwtGuard, DayOpenGuard)
    @Post('/addOrderItems')
    async addOrder(@Body() dto: CreateOrderDto, @Req() req: Request){
        const user = (req as any).user.user_id
        return await this.orderService.addOrder(dto, user)
    }


    // @Patch('/updateOrder/:id')
    // async updateOtherInOrder(@Body() dto: UpdateOrderDto, @Param('id', ParseIntPipe) id: string){
    //     return await this.orderService.updateOtherInOrder(dto, Number(id))
    // }

    @Delete('/deleteFoodInOrder/:id')
    async deleteFoodInOrder(@Param('id', ParseIntPipe) id: string, @Body() dto: DeleteFoodInOrderDto){
        return await this.orderService.deleteFoodInOrder(id, dto)
    }

    @Get('all_orders')
    async all_orders(@Query() dto: FilterOrderDto){
        return await this.orderService.all_orders(dto)

    }

    @Delete('delete_order/:id')
    async delete_order(@Param('id', ParseIntPipe) id: number){
        return await this.orderService.delete_order(id)
    }
}
