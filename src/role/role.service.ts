import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from './role.entity'
import { Filter, Like, Repository } from 'typeorm';
import { CreateRoleDto, UpdateRoleDto, FilterRoleDto } from './roleDto/roleDto'
import { InjectRepository } from '@nestjs/typeorm';
import { DELETED_STATUS } from 'src/enum/enum'; 


@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleEntity: Repository<Role>
    ){}


    async add_role(dto: CreateRoleDto){
        const new_role = await this.roleEntity.create({name: dto.name})
        const saved_role = await this.roleEntity.save(new_role)
        return saved_role
    }

    async updateRole(dto: UpdateRoleDto, id){
        const role = await this.roleEntity.findOne({where: {id: Number(id)}})
        if(!role){throw new NotFoundException('role not found')}

        if(dto.name){role.name = dto.name}
      

        return await this.roleEntity.save(role)
    }

    async all_roles(dto: FilterRoleDto){
        const where: any = {}
        
        if(dto.name){where.name = Like(`%${dto.name}%`)}
        
        where.deleted_status = DELETED_STATUS.NOT_DELETED

        const page = dto.page && dto.page > 0 ? dto.page : 1;
        const limit = dto.limit && dto.limit > 0 ? dto.limit : 10;

        const [all_roles, total] = await this.roleEntity.findAndCount({where,
            skip: (page - 1) * limit, take: limit, order: { id: 'DESC' }
        })
        return {total: total, all_roles: all_roles}
    }

    async delete_role(id){
        const role = await this.roleEntity.findOne({where:{id:Number(id)}})
        if(!role){throw new NotFoundException('role not found')}

        role.deleted_status = DELETED_STATUS.DELETED
        role.deleted_date = new Date()
        await this.roleEntity.save(role)

        return {message: 'role deleted'}
    }
}
