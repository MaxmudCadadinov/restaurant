import { Module,  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TableModule } from './table/table.module';
import { StaffModule } from './staff/staff.module';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';
import { RoleModule } from './role/role.module';
import { DayModule } from './day/day.module';
import { StaffWorkersModule } from './staff_workers/staff_workers.module';
import { OrderItemsModule } from './order_items/order_items.module';
import { FoodModule } from './food/food.module';
import { TypeMenuModule } from './type_menu/type_menu.module';
import { SmenaModule } from './smena/smena.module';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '5588',
    database: 'restaurant',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
    TableModule, 
    StaffModule, 
    OrderModule, 
    RoleModule, 
    DayModule, 
    StaffWorkersModule, 
    OrderItemsModule, 
    FoodModule, 
    TypeMenuModule, 
    SmenaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
