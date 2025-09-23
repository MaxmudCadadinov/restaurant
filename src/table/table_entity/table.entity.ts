import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Staff } from 'src/staff/staff.entity/staff.entity';
import { Order } from '../../order/order.entity';
import { OrderItems } from 'src/order_items/order_items.entity';

export enum Chacking_status{
  Chacking = 'chacking',
  NotChacking = 'not_chacking'
}


@Entity('table')
export class Tables {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  status: number;

  @Column({ type: 'boolean', default: false})
  booking_status: boolean ;
  
  @Column({ type: 'datetime', nullable: true })
  booking_date: Date | null;

  @Column({ type: 'enum', enum: Chacking_status,  nullable: true })
  chacking_status: Chacking_status | null;

  @ManyToOne(() => Order, (order) => order.tabl, { nullable: true })
  @JoinColumn({name: 'order_id'})
  order: Order | null;

  @OneToMany(() => Order, (order) => order.table)
  orders: Order[];//




}
