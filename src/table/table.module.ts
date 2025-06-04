import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tables } from './table_entity/table.entity'
import { Day } from 'src/day/dayEntity/day.entity';
import { StatusDay } from 'src/day/dayEntity/statusDay.entity';
import { Order } from 'src/order/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tables, Day, StatusDay, Order])],
  providers: [TableService],
  controllers: [TableController]
})
export class TableModule {}
