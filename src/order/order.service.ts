import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './order.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './orderDto/createOrderDto'
import { Tables } from '../table/table_entity/table.entity'
import { Staff } from 'src/staff/staff.entity/staff.entity';
import { OrderItems } from '../order_items/order_items.entity'
import { Foods } from 'src/food/food.entity';
import { StatusDay } from 'src/day/dayEntity/statusDay.entity';
import { UpdateOrderDto } from './orderDto/updateOrderDto';


@Injectable()
export class OrderService {
constructor(
    @InjectRepository(Order)
    private readonly orderEntity: Repository<Order>,
    @InjectRepository(Tables)
    private readonly tableEntity: Repository<Tables>,
    @InjectRepository(Staff)
    private readonly staffEntity: Repository<Staff>,
    @InjectRepository(OrderItems)
    private readonly orderItemsEntity: Repository<OrderItems>,
    @InjectRepository(Foods)
    private readonly foodsEntity: Repository<Foods>,
    @InjectRepository(StatusDay)
    private readonly statusDay: Repository<StatusDay>
){}

    async addOrder(dto:CreateOrderDto ){


        if(dto.order_id){

            const order = await this.orderEntity.findOne({where: {id: Number(dto.order_id)}})
            if(!order){throw new NotFoundException("order not found")}
            const order_items = await this.orderItemsEntity.find({where:{order: {id: Number(dto.order_id)}}})
            


        }else if(!dto.order_id){
        const table = await this.tableEntity.findOne({where: {id: Number(dto.table_id)}})
        console.log(table?.status)
        if(!table || table.status === 1 || table.status === 2){throw new NotFoundException("Table not found or status not valid")}
        const worker = await this.staffEntity.findOne({where:{id: dto.worker_id}})
        if (!worker){throw new NotFoundException("worker not found")}
        const day_id = await this.statusDay.findOne({where:{id: 1}})
        if(!day_id){throw new NotFoundException}

        
        
        //Заполням Order
        const new_order = await this.orderEntity.create({table: table, worker: worker, day: { id: day_id.day_id } as any})
        const saved_order = await this.orderEntity.save(new_order)
        //Заполняем Table
        await this.tableEntity.update({id:table.id}, { status: 1, order: saved_order })
        //Заполняем OrderItems
        const uniqueItems: Record<number, number> = {}; // { food_id: quantity }
        for (const item of dto.items) {
        uniqueItems[item.food_id] = (uniqueItems[item.food_id] || 0) + item.quantity;
        }

        let total_summ = 0
        for (const [foodId, quantity] of Object.entries(uniqueItems)){
            const findFood = await this.foodsEntity.findOne({where:{id: Number(foodId)}})
            if(!findFood){throw new NotFoundException('Food not found')}
            total_summ += quantity * findFood.price
            const new_orderItem = await this.orderItemsEntity.create({order: saved_order, food:findFood, quantity: quantity })
            const saved_orderItem = await this.orderItemsEntity.save(new_orderItem)
            
        }     
        
            await this.orderEntity.update({id: saved_order.id}, {total_summ: total_summ})
            return saved_order
    }
        }

    

    async updateOtherInOrder(dto: UpdateOrderDto, id: number){
        const order = await this.orderEntity.findOne({where:{id: Number(id)}, relations: ['table']})
        if(!order){throw new NotFoundException('order not found')}

        if(dto.table_id){
            const table = await this.tableEntity.findOne({where: {id: Number(dto.table_id)}})
            if(!table || table.status === 1 || table.status === 2){throw new NotFoundException('table not found or invalid table_id')}
            
            const old_table = order.table.id
            
            await this.orderEntity.update({id: order.id}, {table: table})
            
            await this.tableEntity.update({id: Number(old_table)}, {status: 0, order: undefined})
        }
        if(dto.worker_id){
            const worker = await this.staffEntity.findOne({where: {id: Number(dto.worker_id)}})
            if(!worker){throw new NotFoundException('Worker not found')}

            await this.orderEntity.update({id: order.id}, {worker: worker})
        
        }
    }

    }


//const getOrder=await this.orderEntity.findOne({where:{id:1},relations:{orderItems:true}})

