import { Controller, Post, Body, Param, ParseIntPipe, Patch, Get, Delete, Query } from '@nestjs/common';
import { FoodService } from './food.service'
import { CreateFoodDto, FilterFoodDto, UpdateFoodDto,   } from './foodDto/Food.dto';




@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) { }



  @Post('/add_food')
  async add_departament(@Body() dto: CreateFoodDto) {
    return await this.foodService.add_food(dto);
  }

  @Get('/get_all_foods')
  async get_all_foods(@Query() dto: FilterFoodDto){
    return await this.foodService.get_all_foods(dto) 
  }

  @Patch('/update_food/:id')
  async update_food(dto: UpdateFoodDto, @Param('id', ParseIntPipe) id: number){
    return await this.foodService.update_food(dto, id)
  }

  @Delete('/delete_food/:id')
  async delete_food(@Param('id', ParseIntPipe) id: number){
    return await this.foodService.delete_food(id)
  }





  @Patch('/stopped_food/:id')
  async stopped_food(@Param('id', ParseIntPipe) id: string) {
    return await this.foodService.stopped_food(id)
  }

  @Patch('/unstopped_food/:id')
  async unstoped_food(@Param('id', ParseIntPipe) id: string) {
    return await this.foodService.unstoped_food(id)
  }
}