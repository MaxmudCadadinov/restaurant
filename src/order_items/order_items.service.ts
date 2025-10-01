import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemOrderDto } from './orderItemsDto/updateOrderItems.dto';
import { OrderItems, STATUS_ORDERITEMS } from './order_items.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/order/order.entity';
import { Foods } from 'src/food/food.entity';




@Injectable()
export class OrderItemsService {
    constructor(
        @InjectRepository(OrderItems)
        private readonly orderItemsEntity: Repository<OrderItems>,
        @InjectRepository(Order)
        private readonly orderEntity: Repository<Order>,
        @InjectRepository(Foods)
        private readonly foodsEntity: Repository<Foods>
    ){}


    async start_cooking(id){
        const orderItems = await this.orderItemsEntity.findOne({where:{id: Number(id)}})
        if(!orderItems){throw new NotFoundException(" orderItems not found")}
        orderItems.status = STATUS_ORDERITEMS.PROCCESING 
        return await this.orderItemsEntity.save(orderItems)
    }

    async finish_cooking(id){
        const orderItems = await this.orderItemsEntity.findOne({where:{id: Number(id)}})
        if(!orderItems){throw new NotFoundException('orderItem not found')}
        orderItems.status = STATUS_ORDERITEMS.FINISH_COOKING
        return await this.orderItemsEntity.save(orderItems)
    }

}
