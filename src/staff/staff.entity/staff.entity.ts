import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,JoinColumn } from 'typeorm';
import { Role } from '../../role/role.entity';
import { Day } from '../../day/dayEntity/day.entity';
import { Order } from '../../order/order.entity'
import { Runshift } from '../../runshift/runshift.entity';



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

  @OneToMany(() => Runshift, (runshift) => runshift.staff)
  runshift: Runshift[];

  @OneToMany(() => Runshift, (runshift) => runshift.activatedAdministator)
  activated_user: Runshift

  @OneToMany(() => Runshift, (runshift) => runshift.updatedUser)
  updatedRunshiftUser: Runshift
}
