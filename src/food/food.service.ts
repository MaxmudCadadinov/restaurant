import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './foodDto/createFood.dto';
import { Foods } from './food.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeMenu } from '../type_menu/type_menu.entity'
import { StopStatus } from './food.entity';

@Injectable()
export class FoodService {
constructor(
    @InjectRepository(Foods)
    private readonly foodsEntity: Repository<Foods>,
    @InjectRepository(TypeMenu)
    private readonly typeMenuEntity: Repository<TypeMenu>,){}

    async add_food(dto: CreateFoodDto){
        const find_type = await this.typeMenuEntity.findOne({where:{id: dto.typeId}})
        if(!find_type){throw new NotFoundException('type_menu not found')}
        const new_food = await this.foodsEntity.create({name: dto.name, price: dto.price, type: find_type})
        const saved_food = await this.foodsEntity.save(new_food)
        return saved_food
    }   
    
    async stopped_food(id: string){
        const food = await this.foodsEntity.findOne({where:{id: Number(id)}})
        if (!food){throw new NotFoundException("food not found")}
        if(food.is_stop === StopStatus.STOPPED){throw new NotFoundException("food already stopped")}
        food.is_stop = StopStatus.STOPPED
        return await this.foodsEntity.save(food)
    }

    async unstoped_food(id: string){
        const food = await this.foodsEntity.findOne({where:{id: Number(id)}})
        if (!food){throw new NotFoundException("food not found")}
        if(food.is_stop === StopStatus.NOT_STOPPED){throw new NotFoundException("food already unstoped")}
        food.is_stop = StopStatus.NOT_STOPPED
        return await this.foodsEntity.save(food)
}
}