import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { TypeMenu } from './type_menu.entity'
import { CreateTypeMenuDto, FilterTypeMenuDto, UpdateTypeMenuDto } from './typeMenu.dto.ts/createTypeMenu.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';
import { DELETED_STATUS } from 'src/enum/enum';

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

    async update_type_menu(dto: UpdateTypeMenuDto, id){
        
        const type_menu = await this.typeMenuEntity.findOne({where:{id: Number(id)}})
        if(!type_menu){throw new NotFoundException('type_menu not found')}


        if(dto.name){type_menu.name = dto.name}

        return await this.typeMenuEntity.save(type_menu)
    }

    async all_type_menu(dto: FilterTypeMenuDto){
        const where: any ={}

        if(dto.name){where.name = Like(`%${dto.name}%`)}
        where.deleted_status = DELETED_STATUS.NOT_DELETED
        
        const page = dto.page && dto.page > 0 ? dto.page : 1;
        const limit = dto.limit && dto.limit > 0 ? dto.limit : 10;

        const [all_type, total] = await this.typeMenuEntity.findAndCount({where, 
            skip: (page - 1) * limit, take: limit, order: { id: 'DESC' }
        })
        return {total: total, all_type: all_type}
    }

    async delete_type_menu(id){
        const type = await this.typeMenuEntity.findOne({where: {id: Number(id)}})
        if(!type){throw new NotFoundException('type menu not found')}

        type.deleted_status = DELETED_STATUS.DELETED
        type.deleted_date = new Date()
        await this.typeMenuEntity.save(type)
        return {message: 'type menu deleted'}
    }
}

