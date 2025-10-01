import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Order } from '../order/order.entity';
import { Foods } from '../food/food.entity';
import { TypeMenu } from '../type_menu/type_menu.entity'


export enum STATUS_ORDERITEMS{
  NOT_STARTED = 'not_started',
  PROCCESING = 'proccessing',
  FINISH_COOKING = 'finish_chooking'
}

@Entity('order_items')
export class OrderItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  quantity: number;

  @ManyToOne(() => Order, (tm) => tm.orderItems)
  @JoinColumn({name:'order_id'})
  order: Order;

  @ManyToOne(() => Foods, (food) => food.orderItems)
  @JoinColumn({name: 'food_id'})
  food: Foods;

  @Column({type: 'enum', enum: STATUS_ORDERITEMS, default: STATUS_ORDERITEMS.NOT_STARTED})
  status: STATUS_ORDERITEMS

}
