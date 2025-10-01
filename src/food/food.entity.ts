import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { TypeMenu } from '../type_menu/type_menu.entity';
import { OrderItems } from '../order_items/order_items.entity';
import { DELETED_STATUS } from 'src/enum/enum'; 

export enum StopStatus {
  STOPPED = 'stopped',
  NOT_STOPPED = 'not_stopped',
}



@Entity('foods')

export class Foods {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'int', nullable: true })
  price: number;

  @Column({ type: 'enum', enum: StopStatus, default: StopStatus.NOT_STOPPED })
  is_stop: StopStatus;

  @ManyToOne(() => TypeMenu, (typeMenu) => typeMenu.foods)
  @JoinColumn({name: 'type_id'})
  type: TypeMenu;

  @OneToMany(() => OrderItems, (item) => item.food)
  orderItems: OrderItems[];

  @Column({type: 'enum', enum:DELETED_STATUS,  default: DELETED_STATUS.NOT_DELETED})
  deleted_status: DELETED_STATUS

  @Column({ type:'datetime', nullable: true})
  deleted_date: Date | null
}
