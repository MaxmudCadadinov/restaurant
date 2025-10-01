import { DataSource } from "typeorm";
import { Runshift } from "./runshift/runshift.entity"; 
import { Day } from "./day/dayEntity/day.entity";
import { Order } from "./order/order.entity";
import { Staff } from "./staff/staff.entity/staff.entity";
import { Role } from "./role/role.entity";
import { Tables } from "./table/table_entity/table.entity";
import { OrderItems } from "./order_items/order_items.entity";
import { Foods } from "./food/food.entity";
import { TypeMenu } from "./type_menu/type_menu.entity";


export const dataSource = new DataSource({
  type: "mysql", // или mysql/sqlite
  host: "localhost",
  port: 3306,
  username: "root",
  password: "5588",
  database: "restaurant",
  synchronize: true, // только для разработки! авто-создаёт таблицы
  entities: [Runshift, Day, Order, Staff,Role, Tables, OrderItems, Foods, TypeMenu],
});
