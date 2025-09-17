import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Staff } from 'src/staff/staff.entity/staff.entity';
import { Order } from '../../order/order.entity';
import { OrderItems } from 'src/order_items/order_items.entity';



@Entity('table')
export class Tables {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  status: number;

  @Column({ type: 'datetime', nullable: true })
  booking_date: Date;

  @ManyToOne(() => Order, (order) => order.tabl)
  @JoinColumn({name: 'order_id'})
  order: Order;

  @OneToMany(() => Order, (order) => order.table)
  orders: Order[];//
}
