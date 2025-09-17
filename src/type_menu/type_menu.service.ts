import { Injectable, OnModuleInit } from '@nestjs/common';
import { TypeMenu } from './type_menu.entity'
import { CreateTypeMenuDto } from './typeMenu.dto.ts/createTypeMenu.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TypeMenuService implements OnModuleInit {
    constructor(
        @InjectRepository(TypeMenu)
        private readonly typeMenuEntity: Repository<TypeMenu>){}

        async onModuleInit() {
            const currentCount=await this.typeMenuEntity.count();
            if(currentCount==0){
                for(let i=0; i<5; i++){
                    const region=await this.typeMenuEntity.findOne({ where: { } });
                    if(!region) return
        const defaultUser = this.addTypeMenu({
            name: `typeMenu ${i + 1}`
        }); 
                }
            }
        }


    async addTypeMenu(dto: CreateTypeMenuDto){
        const new_typeMenu = await this.typeMenuEntity.create({name: dto.name}) 
        const saved_typeMenu = await this.typeMenuEntity.save(new_typeMenu)
        return saved_typeMenu
    }
}
