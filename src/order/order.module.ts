
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { Order } from './order.entity'
import { OrderItems } from 'src/order_items/order_items.entity';
import{ Foods } from '../food/food.entity'
import { Tables } from 'src/table/table_entity/table.entity';
import { Staff } from 'src/staff/staff.entity/staff.entity';
import { StatusDay } from 'src/day/dayEntity/statusDay.entity';


@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    TypeOrmModule.forFeature([Order, OrderItems, Foods, Tables, Staff, StatusDay])],
  
})
export class OrderModule {}
