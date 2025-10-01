import { Injectable, NotFoundException } from '@nestjs/common';
import { DELETED_STATUS } from 'src/enum/enum'; 
import { Staff } from './staff.entity/staff.entity';
import { CreateStaffDto } from './staff.dto/createStaff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Role } from '../role/role.entity'
import { UpdateStaffDto } from './staff.dto/createStaff.dto';
import { FilterStaffDto } from './staff.dto/createStaff.dto';


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

    async update_staff(dto: UpdateStaffDto, id){
        const staff = await this.staffEntity.findOne({where:{id: Number(id)}})
        if(!staff){throw new NotFoundException('staff not found')}

        if(dto.name){staff.name = dto.name}
        if(dto.password){staff.password = dto.password}
        if(dto.roleId){
            const role = await this.roleEntity.findOne({where:{id: Number(dto.roleId)}})
            if(!role){throw new NotFoundException('role not found')}
            staff.role = role
        }

        return await this.staffEntity.save(staff)
        
    }

    async get_all_staff(dto: FilterStaffDto){
        const where: any = {}

        if(dto.name){where.name = Like(`%${dto.name}%`)}
        if(dto.roleId){
            const role = await this.roleEntity.findOne({where: {id: Number(dto.roleId)}})
            if(!role){throw new NotFoundException('role not found')}
            where.role = {id: role.id}
        }
        where.deleted_status = DELETED_STATUS.NOT_DELETED

            const page = dto.page && dto.page > 0 ? dto.page : 1;
            const limit = dto.limit && dto.limit > 0 ? dto.limit : 10;

        const [all_staff, total] = await this.staffEntity.findAndCount({where,
            skip: (page - 1) * limit, take: limit, order: { id: 'DESC' }
        })
        return { total: total, all_staff: all_staff }
    }

    async delete_staff(id){
        const staff = await this.staffEntity.findOne({where: {id: Number(id)}})
        if(!staff){throw new NotFoundException('staff not found')}

        staff.deleted_status = DELETED_STATUS.DELETED
        staff.deletedDate = new Date()
        await this.staffEntity.save(staff)
        return {message: 'staff is deleted'}
    }
}
