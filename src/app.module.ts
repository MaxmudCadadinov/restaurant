import { Module,  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TableModule } from './table/table.module';
import { StaffModule } from './staff/staff.module';
import { OrderModule } from './order/order.module';
import { RoleModule } from './role/role.module';
import { DayModule } from './day/day.module';

import { OrderItemsModule } from './order_items/order_items.module';
import { FoodModule } from './food/food.module';
import { TypeMenuModule } from './type_menu/type_menu.module';

import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { RunshiftModule } from './runshift/runshift.module';
import { SmenaModule } from './smena/smena.module';
import { LoginLogautModule } from './login-logaut/login-logaut.module';
import { RunshiftStatisticsModule } from './runshift_statistics/runshift_statistics.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DayStatisticsModule } from './day_statistics/day_statistics.module';
import { OrderItemsGateway } from './websocket';




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
  ScheduleModule.forRoot(),
    TableModule, 
    StaffModule, 
    OrderModule, 
    RoleModule, 
    DayModule, 
    OrderItemsModule, 
    FoodModule, 
    TypeMenuModule, 
    RunshiftModule, SmenaModule, LoginLogautModule, RunshiftStatisticsModule, DayStatisticsModule],
  controllers: [AppController],
  providers: [AppService, OrderItemsGateway],
})
export class AppModule {}
