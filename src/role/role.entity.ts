import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Staff } from 'src/staff/staff.entity/staff.entity';

@Entity('role_id')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'int', nullable: true, default: 1 })
  status: number;

  @OneToMany(() => Staff, (staff) => staff.role)
  staff: Staff[];
}
