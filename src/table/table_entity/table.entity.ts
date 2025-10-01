import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Staff } from 'src/staff/staff.entity/staff.entity';
import { Order } from '../../order/order.entity';
import { OrderItems } from 'src/order_items/order_items.entity';
import { DELETED_STATUS } from 'src/enum/enum'; 


export enum Chacking_status{
  Chacking = 'chacking',
  NotChacking = 'not_chacking'
}

export enum Table_status{
  Opened = 'opened',
  Cloased = 'cloased'
}

export enum booking_status{
  booking = 'booking',
  not_booking = 'not_booking'
}

@Entity('table')
export class Tables {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'enum', enum: Table_status, default: Table_status.Opened })
  status: Table_status;

  @Column({ type: 'enum', enum: booking_status,  default: booking_status.not_booking})
  booking_status: booking_status ;
  
  @Column({ type: 'datetime', nullable: true })
  booking_date: Date | null;

  @Column({ type: 'enum', enum: Chacking_status,  nullable: true })
  chacking_status: Chacking_status | null;

  @ManyToOne(() => Order, (order) => order.tabl, { nullable: true })
  @JoinColumn({name: 'order_id'})
  order: Order | null;

  @OneToMany(() => Order, (order) => order.table)
  orders: Order[];//

  @Column({type: 'enum', enum: DELETED_STATUS, default: DELETED_STATUS.NOT_DELETED})
  deleted_status: DELETED_STATUS

  @Column({type: 'datetime', nullable: true})
  deleted_date: Date
}
