import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Staff } from 'src/staff/staff.entity/staff.entity'; 
import { Order } from '../../order/order.entity';

@Entity('day')
export class Day {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal',precision: 10, scale: 2, nullable: true })
  amount: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  start: Date;

  @Column({ type: 'datetime', nullable: true })
  finish: Date | null;

  @ManyToOne(() => Staff, (staff) => staff.staff)
  @JoinColumn({name: 'administrator_id'})
  administrator: Staff;

  @OneToMany(() => Order, (order) => order.day)
  orders: Order[];
}


