import { Controller,Post, Body } from '@nestjs/common';
import { FoodService } from './food.service'
import { CreateFoodDto } from './foodDto/createFood.dto';


@Controller('food')
export class FoodController {
constructor(private readonly departamentService: FoodService) {}



@Post('/add_food')

  async add_departament(@Body() dto: CreateFoodDto) {
   
    return await this.departamentService.add_food(dto);
  }
}