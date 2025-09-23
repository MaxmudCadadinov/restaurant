import { Entity, Column, PrimaryColumn } from 'typeorm';

export enum Status_day{
  open = "opened",
  closed = "closed"
}


@Entity('status_day')
export class StatusDay {
  // можно сделать PrimaryColumn, потому что строка будет всегда одна
  @PrimaryColumn({ default: 1 })
  id: number;

  @Column({ type: 'enum', 
    enum: Status_day, 
    default: Status_day.closed })
  is_open: Status_day;

  
  @Column({ type: 'int', nullable: true})
  day_id: number | null;
}
