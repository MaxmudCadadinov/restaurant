import { NotFoundException } from "@nestjs/common"
import { Foods } from "src/food/food.entity"


export function  calc_total_summ(items: {food_id: number, quantity: number}[], foods: Foods[], total: number): number{
    let total_summ = total
    
    for(let i of items){
        const food = foods.find(f => f.id === i.food_id)
        if(!food){throw new NotFoundException('food not found')}
        total_summ +=Number(food.price) * i.quantity
    }
    return total_summ
}

