import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Foods } from '../food/food.entity';
import { DELETED_STATUS } from 'src/enum/enum';

@Entity('type_menu')
export class TypeMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({type: 'enum', enum: DELETED_STATUS, default: DELETED_STATUS.NOT_DELETED})
  deleted_status: DELETED_STATUS

  @Column({type: 'datetime', nullable:true})
  deleted_date: Date | null

  @OneToMany(() => Foods, (food) => food.type)
  foods: Foods[];
}
