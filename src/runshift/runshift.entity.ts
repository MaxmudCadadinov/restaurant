import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Staff } from "../staff/staff.entity/staff.entity";
import { Day } from "src/day/dayEntity/day.entity";

export enum RunshiftCode{
    ACTIVATED = 'ACTIVATED',
    NOT_ACTIVATED = 'NOT_ACTIVATED'
}

export enum DeactivatedUser{
    server_deactivated = 'server_deactivated',
    staff_deactivated = 'staff_deactivated'
}

@Entity('runshify')

export class Runshift {

@PrimaryGeneratedColumn()
id: number

@ManyToOne(() => Staff, (staff) => staff.runshift)
@JoinColumn({name: 'staff_id'})
staff: Staff

@Column({type: 'datetime', nullable: true})
date_start: Date | null

@Column({ type: 'datetime', nullable: true })
date_finish: Date | null;

@Column({ type: 'varchar', nullable:true})
working_hours: string

@Column({type: 'int' })
code: number

@Column ({type: 'enum', enum: RunshiftCode, default: RunshiftCode.NOT_ACTIVATED})
code_status: RunshiftCode

@ManyToOne(() => Staff, (staff) => staff.activated_user)
@JoinColumn({name: 'activated_user'})
activatedAdministator: Staff

@Column({type: 'enum', enum: DeactivatedUser, nullable: true})
deactivatedUser: DeactivatedUser | null

@ManyToOne(() => Day, (day) => day.runshift, {nullable: true})
@JoinColumn({name: 'day_id'})
day: Day


@Column({type: 'datetime'})
deadlineCode: Date

@Column({type: 'datetime', nullable: true})
deadlineShiftTime: Date | null

@Column({type:'datetime', nullable: true})
update: Date

@ManyToOne(() => Staff, (staff) => staff.updatedRunshiftUser, {nullable: true})
updatedUser: Staff
}
