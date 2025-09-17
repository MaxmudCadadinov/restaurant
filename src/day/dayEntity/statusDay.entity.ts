import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('status_day')
export class StatusDay {
  // можно сделать PrimaryColumn, потому что строка будет всегда одна
  @PrimaryColumn({ default: 1 })
  id: number;

  @Column({ type: 'boolean', default: false })
  is_open: boolean;

  @Column({ type: 'int', nullable: true})
  day_id: number | null;
}
