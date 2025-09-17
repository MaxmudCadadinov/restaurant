import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Staff } from 'src/staff/staff.entity/staff.entity';
import { Smena } from '../smena/smena.entity';

@Entity('staff_workers')
export class StaffWorkers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', nullable: true })
  started: Date;

  @Column({ type: 'datetime', nullable: true })
  ended: Date;

  @ManyToOne(() => Smena, (smena) => smena.staffWorkers)
  @JoinColumn({name: 'smena_id'})
  smena: Smena;//

  @ManyToOne(() => Staff, (staff) => staff.staffWorkers)
  staff: Staff;//
}
