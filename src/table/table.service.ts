import { Injectable, NotFoundException } from '@nestjs/common';
import { booking_status, Table_status, Tables } from './table_entity/table.entity'
import { CreateTableDto, UpdateTableDto } from './tabledto/create_tabledto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Day } from 'src/day/dayEntity/day.entity';
import { StatusDay } from 'src/day/dayEntity/statusDay.entity';
import { Order } from 'src/order/order.entity';
import { BookingDateDto } from './tabledto/booking_tableDto';
import { Status_day } from 'src/day/dayEntity/statusDay.entity';
import { Chacking_status } from './table_entity/table.entity';
import { CreateOrderDto } from 'src/order/orderDto/createOrderDto';
import { DELETED_STATUS } from 'src/enum/enum'; 



@Injectable()
export class TableService {
    constructor(
        @InjectRepository(Tables)
        private readonly tablesEntity: Repository<Tables>,
        @InjectRepository(Day)
        private readonly dayEntity: Repository<Day>,
        @InjectRepository(StatusDay)
        private readonly statusDayEntity: Repository<StatusDay>,
        @InjectRepository(Order)
        private readonly orderEntity: Repository<Order>) { }


    async add_table(dto: CreateTableDto) {
        const new_table = await this.tablesEntity.create({ name: dto.name })
        const saved_table = await this.tablesEntity.save(new_table)
        return saved_table
    }

    async all_tables(dto) {
        const where: any = {}

        if (dto.name) { where.name = Like(`%${dto.name}%`) }
        if (dto.status) { where.status = dto.status }
        if (dto.booking_status) { where.booking_status = dto.booking_status }
        if (dto.chacking_status) { where.chacking_status = dto.chacking_status }
        where.deleted_status = DELETED_STATUS.NOT_DELETED

        const page = dto.page && dto.page > 0 ? dto.page : 1;
        const limit = dto.limit && dto.limit > 0 ? dto.limit : 10;


        const [tables, total] = await this.tablesEntity.findAndCount({ where, relations: ['order'], skip: (page - 1) * limit, take: limit, order: { id: 'DESC' } })
        return { total: total, all_tables: tables}
    }

    async delete_table(id){
        const table = await this.tablesEntity.findOne({where: {id: Number(id)}})
        if(!table){throw new NotFoundException('table not found')}

        table.deleted_status = DELETED_STATUS.DELETED
        table.deleted_date = new Date()
        await this.tablesEntity.save(table)

        return {message: 'table deleted'}
    }


    async close_table(id) {

        const table = await this.tablesEntity.findOne({ where: { id: Number(id) } })
        if (!table) { throw new NotFoundException("Table not found") }

        if (table.status === Table_status.Opened && table.chacking_status === Chacking_status.Chacking) {
            table.chacking_status = null
            table.status = Table_status.Cloased
            return await this.tablesEntity.save(table)
        } else { return { message: 'счет не оплачен или пустой стол' } }
    }

    async close_chack(id) {
        const table = await this.tablesEntity.findOne({ where: { id: Number(id) }, relations: ['order'] })
        if (!table) { throw new NotFoundException("table not found") }

        //console.log(table)
        if (table.status === Table_status.Cloased && table.chacking_status === Chacking_status.NotChacking && table.order) {
            const day_id = (await this.statusDayEntity.findOne({ where: { id: 1 } }))?.day_id
            if (!day_id) { throw new NotFoundException("dayId not found") }
            //console.log(day_id)
            const day = await this.dayEntity.findOne({ where: { id: day_id } })
            if (!day) { throw new NotFoundException("day not found") }
            //console.log(day)
            day.amount += Number(table.order.total_summ)
            day.count_chack += 1




            const order = await this.orderEntity.findOne({ where: { id: table.order.id } })
            if (!order) { throw new NotFoundException }
            order.closed = new Date()



            table.chacking_status = Chacking_status.Chacking
            table.order = null



            await this.orderEntity.save(order)
            await this.dayEntity.save(day)

            return await this.tablesEntity.save(table)
        } else { return { message: 'Стол пустой и т.д' } }
    }

    async booking_table(id, dto: BookingDateDto) {
        const table = await this.tablesEntity.findOne({ where: { id: Number(id) } })
        if (!table) { throw new NotFoundException("table not found") }

        if (table.booking_status === booking_status.not_booking) {

            table.booking_date = new Date(dto.booking_table_date)
            table.booking_status = booking_status.booking
            return await this.tablesEntity.save(table)
        } else { return { message: 'стол уже забронирован' } }
    }

    async updateBookingTime(id, dto: BookingDateDto) {
        const table = await this.tablesEntity.findOne({ where: { id: Number(id) } })
        if (!table) { throw new NotFoundException("table not found") }
        if (table.booking_status === booking_status.booking) {
            table.booking_date = new Date(dto.booking_table_date)
            return await this.tablesEntity.save(table)
        } else { return { message: "table not booked" } }
    }

    async unbooking_table(id) {
        const table = await this.tablesEntity.findOne({ where: { id: Number(id) } })
        if (!table) { throw new NotFoundException("table not found") }

        if (table.booking_status === booking_status.booking) {
            table.booking_status = booking_status.not_booking
            table.booking_date = null
            return await this.tablesEntity.save(table)
        } else { return { message: "table not booked" } }
    }
}
