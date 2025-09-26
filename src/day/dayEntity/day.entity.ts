import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { Staff } from 'src/staff/staff.entity/staff.entity'; 
import { Order } from '../../order/order.entity';
import { Runshift } from 'src/runshift/runshift.entity';


@Entity('day')
export class Day {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal',precision: 10, scale: 2, default: 0, transformer: {
    to: (value: number) => value,
    from: (value: string): number => Number(value),
  },})
  amount: number;

  @Column({ type: 'int', unsigned: true, default: 0, })
  count_chack: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  start: Date;

  @Index()
  @Column({ type: 'datetime', nullable: true })
  finish: Date | null;

  @ManyToOne(() => Staff, (staff) => staff.staff)
  @JoinColumn({name: 'administrator_id'})
  administrator: Staff;

  @OneToMany(() => Order, (order) => order.day)
  orders: Order[];

  @OneToMany(() => Runshift, (runshift) => runshift.day)
  runshift: Runshift
}


