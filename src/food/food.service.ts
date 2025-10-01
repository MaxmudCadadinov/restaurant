import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto, UpdateFoodDto, FilterFoodDto } from './foodDto/Food.dto';
import { DELETED_STATUS } from 'src/enum/enum'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { TypeMenu } from '../type_menu/type_menu.entity'
import { StopStatus } from './food.entity';
import { Foods } from './food.entity';


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


    async update_food(dto: UpdateFoodDto, id){
        
        const food = await this.foodsEntity.findOne({where: {id: Number(id)}})
        if(!food){throw new NotFoundException('food not found')}
        
        if(dto.name){food.name = dto.name}
        if(dto.price){food.price = dto.price}
        if(dto.is_stop){food.is_stop = dto.is_stop}
        if(dto.typeId){
            const typeMenu = await this.typeMenuEntity.findOne({where:{id: dto.typeId}})
            if(!typeMenu){throw new NotFoundException("TypeMenu not found")}
            food.type = typeMenu
        }
      
        return await this.foodsEntity.save(food)
    }
    


    async delete_food(id){
        const food = await this.foodsEntity.findOneBy({id: Number(id)})
        if(!food){throw new NotFoundException('Food not found')}
        food.deleted_status = DELETED_STATUS.DELETED
        food.deleted_date = new Date()
        await this.foodsEntity.save(food)
        return {message: 'food is deleted'}
    }


    async get_all_foods(dto: FilterFoodDto){
        const where:any = {}
        
        if(dto.name){where.name = Like(`%${dto.name}%`)}
        if(dto.is_stop){where.is_stop = dto.is_stop}
        if(dto.typeId){
            const type = await this.typeMenuEntity.findOne({where:{id:dto.typeId}})
            if(!type){throw new NotFoundException('TypeMenu not found')}
            where.type = {id: type.id}
        }
        where.deleted_status = DELETED_STATUS.NOT_DELETED

            const page = dto.page && dto.page > 0 ? dto.page : 1;
            const limit = dto.limit && dto.limit > 0 ? dto.limit : 10;


        const [all_foods, total] = await this.foodsEntity.findAndCount({where, 
            skip: (page - 1) * limit, take: limit, order: { id: 'DESC' }
        })
        return {all_foods, total}
        
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