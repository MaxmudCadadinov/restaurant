import { Injectable, NotFoundException } from '@nestjs/common';
import { Staff } from './staff.entity/staff.entity'
import { CreateStaffDto } from './staff.dto/createStaff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../role/role.entity'


@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(Staff)
        private readonly staffEntity: Repository<Staff>,
        @InjectRepository(Role)
        private readonly roleEntity: Repository<Role>
    ){}

    async addStaff(dto: CreateStaffDto){
        const staff = await this.staffEntity.findOne({where:{name: dto.name}})
        if(staff){throw new NotFoundException('worker with this name finded')}
        const role = await this.roleEntity.findOne({where:{id: dto.roleId}})
        if(!role){throw new NotFoundException('role not founded')}
        const new_staff = await this.staffEntity.create({name: dto.name, password: dto.password, role: role })
        const saved_staff = await this.staffEntity.save(new_staff)
        return saved_staff
    }
}
