import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany, JoinColumn } from 'typeorm';
import { Tables } from '../table/table_entity/table.entity';
import { Day } from '../day/dayEntity/day.entity';
import { OrderItems } from '../order_items/order_items.entity';
import { Staff } from 'src/staff/staff.entity/staff.entity';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tables, (table) => table.orders)
  @JoinColumn({name:'table_id'})
  table: Tables; //

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'datetime', nullable: true })
  closed: Date;

  @Column({type: 'decimal',precision: 10, scale: 2, default: 0})
  total_summ: number
 
  @ManyToOne(() => Staff, (staff) => staff.orders, )
  @JoinColumn({name:'worker_id'})
  worker: Staff; 

  @ManyToOne(() => Day, (day) => day.orders)
  @JoinColumn({name:'day_id'})
  day: Day;  //

  @OneToMany(() => OrderItems, (oi) => oi.order)
  orderItems: Day[];

  @OneToMany(() => Tables, (tables) => tables.order)
  tabl: Day[];
}


