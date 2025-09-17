import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { StaffWorkers } from '../staff_workers/staff_workers.entity';

@Entity('smena')
export class Smena {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: true })
  data: Date;

  @Column({ type: 'datetime', nullable: true })
  start_time: Date;

  @Column({ type: 'datetime', nullable: true })
  finish_time: Date;

  @OneToMany(() => StaffWorkers, (sw) => sw.smena)
  staffWorkers: StaffWorkers[];//
}
