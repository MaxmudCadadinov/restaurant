import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Staff } from 'src/staff/staff.entity/staff.entity';
import { DELETED_STATUS } from 'src/enum/enum'; 



@Entity('role_id')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  name: string;

  @OneToMany(() => Staff, (staff) => staff.role)
  staff: Staff[];

  @Column({ type: 'enum', enum: DELETED_STATUS, default: DELETED_STATUS.NOT_DELETED })
  deleted_status: DELETED_STATUS;

  @Column({type:'datetime', nullable: true})
  deleted_date: Date
}


// update-role.dto.ts


  
