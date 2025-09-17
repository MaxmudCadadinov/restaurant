import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Foods } from '../food/food.entity';

@Entity('type_menu')
export class TypeMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  name: string;

  @OneToMany(() => Foods, (food) => food.type)
  foods: Foods[];
}
