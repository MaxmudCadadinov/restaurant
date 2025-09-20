import { Controller,Post, Body, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { FoodService } from './food.service'
import { CreateFoodDto } from './foodDto/createFood.dto';


@Controller('food')
export class FoodController {
constructor(private readonly departamentService: FoodService) {}



@Post('/add_food')
  async add_departament(@Body() dto: CreateFoodDto) {
    return await this.departamentService.add_food(dto);
  }

  @Patch('/stopped_food/:id')
  async stopped_food(@Param('id', ParseIntPipe) id: string){
    return await this.departamentService.stopped_food(id)
}

  @Patch('/unstopped_food/:id')
  async unstoped_food(@Param('id', ParseIntPipe) id: string){
    return await this.departamentService.unstoped_food(id)  
}
}