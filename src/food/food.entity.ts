import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { TypeMenu } from '../type_menu/type_menu.entity';
import { OrderItems } from '../order_items/order_items.entity';

@Entity('foods')
export class Foods {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'int', nullable: true })
  price: number;

  @ManyToOne(() => TypeMenu, (typeMenu) => typeMenu.foods)
  @JoinColumn({name: 'type_id'})
  type: TypeMenu;

  @OneToMany(() => OrderItems, (item) => item.food)
  orderItems: OrderItems[];
}
