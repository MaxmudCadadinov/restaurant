import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemOrderDto } from './orderItemsDto/updateOrderItems.dto';
import { OrderItems } from './order_items.entity'
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



    async updateOrderItems(dto:CreateOrderItemOrderDto, id: number){
    
            const order = await this.orderEntity.findOne({where:{id: Number(id)}})
            if(!order){throw new NotFoundException('order not found')}
    
            if(dto.items && dto.items.length > 0){
                let total_summ = Number(order.total_summ)
                
    
                for (let i of dto.items){
                    const food = await this.foodsEntity.findOne({where:{id:Number(i.food_id)}})
                    if(!food){throw new NotFoundException('Food not found')}
                    total_summ += Number(food.price) * Number(i.quantity)
                    
                    const findOrderItem = await this.orderItemsEntity.findOne({where: {order: order, food: food}})
                    if(!findOrderItem){
                    const new_order_item = await this.orderItemsEntity.create({order: order, food: food, quantity: i.quantity }) 
                    await this.orderItemsEntity.save(new_order_item)
                    }else if(findOrderItem){
                        await this.orderItemsEntity.update({id: findOrderItem.id}, {quantity: findOrderItem.quantity + i.quantity})
                    }
                } 
                order.total_summ = total_summ
                await this.orderEntity.save(order)
                
            }
            return order
        }


async deleteInOrderItems(dto: CreateOrderItemOrderDto, id: number){
        const orderItems = await this.orderItemsEntity.find({where:{order:{id: Number(id)}}, relations: ['food']} )
       for(let i of dto.items){
            for(let j of orderItems){
                if(i.food_id === j.food.id){
                    j.quantity -= i.quantity

                    if (j.quantity <= 0) {
                        await this.orderItemsEntity.remove(j); // удаляем полностью
                    } else {
                        await this.orderItemsEntity.save(j); // сохраняем обновлённое количество
                    }
                }
            }
       }
       let total = 0
       const forderItems = await this.orderItemsEntity.find({where:{order:{id: Number(id)}}, relations: ['food']} )
       for(let i of forderItems){
        let price = i.food.price * i.quantity
        total += price
       }
       await this.orderEntity.update({id: Number(id)}, {total_summ: total})
    }
}
