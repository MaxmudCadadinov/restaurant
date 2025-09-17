import { Injectable } from '@nestjs/common';
import { Role } from './role.entity'
import { Repository } from 'typeorm';
import { CreateRoleDto } from './roleDto/roleDto'
import { InjectRepository } from '@nestjs/typeorm';

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
}
