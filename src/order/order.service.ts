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

if(!dto.order_id){

        const table = await this.tableEntity.findOne({where: {id: dto.table_id}})
        if(!table){throw new NotFoundException("table not found")}
        if (table.status === 0 && !table.order){

            //Заполняем rder
            const worker = await this.staffEntity.findOne({where:{id: dto.worker_id}})
            if (!worker){throw new NotFoundException("worker not found")}
            const day_id = await this.statusDay.findOne({where:{id: 1}})
            if(!day_id){throw new NotFoundException}
            const new_order = await this.orderEntity.create({table: table, worker: worker, day: { id: day_id.day_id } as any})
            const saved_order = await this.orderEntity.save(new_order)


            await this.tableEntity.update({id:table.id}, { status: 1, order: saved_order })

            //Заполняем orderItem
            const order_items = dto.items
            
            const map  = new Map()
            for(let i of order_items){
                let prev = map.get(i.food_id) || 0
                map.set(i.food_id, prev + i.quantity)
            }
            
            let total = saved_order.total_summ
            for(let[key, value] of map){
                const food = await this.foodsEntity.findOne({where:{id: key}})
                if(!food){throw new NotFoundException("food not found")}
                total += food.price * value
                const order_item = await this.orderItemsEntity.create({order: saved_order,food: key, quantity: value})
                    await this.orderItemsEntity.save(order_item)
            }        
            const up_price = this.orderEntity.update(saved_order.id, {total_summ: total})

            const all_order_items = await this.orderItemsEntity.find({where:{id: saved_order.id}, relations: ['food']})

           




        }else{return {"message1": "Ничего не произашло"}}

    
    }else if(dto.order_id){
        
        const order = await this.orderEntity.findOne({where: {id: dto.order_id}, relations:['table']})
        //console.log(order)
        if (!order){throw new NotFoundException("order not found")}
        const table = await this.tableEntity.findOne({where: {id: order.table.id}, relations: ['order']})
        if(!table){throw new NotFoundException("table not found")}
        //console.log(table)
        
        
        
        

        
        
        if(table.status === 1 && table.order){

        const newItems = dto.items

        const map = new Map()
        for(let i of newItems){
            let prev = map.get(i.food_id) || 0
            map.set(i.food_id, prev + i.quantity)
        }
                                        //Map(3) { 2 => 4, 1 => 3, 4 => 6 }
        const order_items = await this.orderItemsEntity.find({where:{order: order}, relations: ['food', 'order']})
        
        const order_item_map = new Map()
        for (let i of order_items){
            let prev = order_item_map.get(i.food.id) || 0
            order_item_map.set(i.food.id, prev + i.quantity)
        }
                                        //Map(3) { 2 => 4, 1 => 3, 4 => 6 }
    
        for (let [key, value] of map) {
        order_item_map.set(key, (order_item_map.get(key) || 0) + value);

    }
                                        //console.log(order_item_map) Map(3) { 2 => 8, 1 => 6, 4 => 12 }
        for(let[foodId, quantity] of order_item_map){
            const food = await this.foodsEntity.findOne({where:{id: foodId}})
            if(!food){throw new NotFoundException("food not found")}
            const ex = await this.orderItemsEntity.findOne({where: {food: food, order: order, }, relations:['food', 'order']})
            if(ex){
                ex.quantity = quantity
                await this.orderItemsEntity.save(ex)
            }else{
                const new_or_item = await this.orderItemsEntity.create({order: order, food: food, quantity: quantity})
                await this.orderItemsEntity.save(new_or_item)
            }
        }
        
        }

        let total_summ = 0
        const all_order_items = await this.orderItemsEntity.find({where: {order: order}, relations: ['food']})
        for(let i of all_order_items){
            const food = await this.foodsEntity.findOne({where: {id: i.food.id}})
            if(!food){throw new NotFoundException}
            total_summ += food.price * i.quantity
        }

        await this.orderEntity.update(order.id, {total_summ: total_summ})
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

