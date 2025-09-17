import { Module } from '@nestjs/common';
import { OrderItemsController } from './order_items.controller';
import { OrderItemsService } from './order_items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/order/order.entity';
import { Foods } from 'src/food/food.entity';
import { OrderItems } from './order_items.entity';

@Module({
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
  imports: [TypeOrmModule.forFeature([Order, Foods, OrderItems])]
})
export class OrderItemsModule {}
