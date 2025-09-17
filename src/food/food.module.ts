import { Module } from '@nestjs/common';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { Foods } from './food.entity';
import { TypeMenu } from 'src/type_menu/type_menu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Foods, TypeMenu])],
  controllers: [FoodController],
  providers: [FoodService],
  exports: [FoodService]
})
export class FoodModule {}
