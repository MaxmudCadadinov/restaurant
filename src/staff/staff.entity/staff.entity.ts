import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,JoinColumn } from 'typeorm';
import { Role } from '../../role/role.entity';
import { Day } from '../../day/dayEntity/day.entity';
import { Tables } from '../../table/table_entity/table.entity';
import { StaffWorkers } from '../../staff_workers/staff_workers.entity';
import { Order } from '../../order/order.entity'


@Entity('staff')
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  password: string;

  @ManyToOne(() => Role, (role) => role.staff)
  @JoinColumn({name: 'role_id'})
  role: Role;

  @OneToMany(() => Day, (day) => day.administrator)
  staff: Day[];

  @OneToMany(() => Order, (order) => order.worker)
  orders: Order[];//

  @OneToMany(() => StaffWorkers, (sw) => sw.staff)
  staffWorkers: StaffWorkers[];//
}
