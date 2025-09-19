import { Injectable, NotFoundException } from '@nestjs/common';
import { Tables } from './table_entity/table.entity'
import { CreateTableDto } from './tabledto/create_tabledto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Day } from 'src/day/dayEntity/day.entity';
import { StatusDay } from 'src/day/dayEntity/statusDay.entity';
import { Order } from 'src/order/order.entity';
import { BookingDateDto } from './tabledto/booking_tableDto';

@Injectable()
export class TableService {
    constructor (
        @InjectRepository(Tables)
        private readonly tablesEntity: Repository<Tables>,
        @InjectRepository(Day)
        private readonly dayEntity: Repository<Day>,
        @InjectRepository(StatusDay)
        private readonly statusDayEntity: Repository<StatusDay>,
        @InjectRepository(Order)
        private readonly orderEntity: Repository<Order>){}

    
        async add_table(dto: CreateTableDto){
            const new_table = await this.tablesEntity.create({name: dto.name})
            const saved_table = await this.tablesEntity.save(new_table)
            return saved_table
        }

        async close_table(id){

            const table = await this.tablesEntity.findOne({where: {id: Number(id)}})
            if(!table){throw new NotFoundException("Table not found")}

            if(table.status === 1 && table.chacking_status === true){
                table.chacking_status = null
                return await this.tablesEntity.save(table)
            }else{return {message: 'счет не оплачен или пустой стол'}}
        }

        async close_chack(id){
            const table = await this.tablesEntity.findOne({where: {id:Number(id) }})
            if(!table){throw new NotFoundException("table not found")}
            
            if (table.status === 1 &&  table.chacking_status === false && table.order){
                const day_id = (await this.statusDayEntity.findOne({where: {id: 1}}))?.id
                const day = await this.dayEntity.findOne({where: {id: day_id}})
                if(!day){throw new NotFoundException}
                
                day.amount += table.order.total_summ
                await this.dayEntity.save(day)
                
                

                const order = await this.orderEntity.findOne({where: {id: table.order.id}})
                if(!order){throw new NotFoundException}
                order.closed = new Date()
                await this.orderEntity.save(order) 


                table.chacking_status = true
                table.order = null 
                
                return await this.tablesEntity.save(table)
            }else{return {message: 'Стол пустой и т.д'}}
        }

        async booking_table(id, dto: BookingDateDto){
            const table = await this.tablesEntity.findOne({where:{id: Number(id)}})
            if(!table){throw new NotFoundException("table not found")}
            
            if(table.booking_status === false){

            table.booking_date =  new Date(dto.booking_table_date)   
            table.booking_status = true
            }else{return {message: 'стол уже забронирован'}}
        }
}
