import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateDayDto } from './day_dto/create_day.dto';
import { Day } from './dayEntity/day.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Staff } from 'src/staff/staff.entity/staff.entity';
import { Role } from '../role/role.entity'
import { StatusDay } from './dayEntity/statusDay.entity'


@Injectable()
export class DayService {
    constructor(
        @InjectRepository(Day)
        private readonly dayEntity: Repository<Day>,
        @InjectRepository(Staff)
        private readonly staffEntity: Repository<Staff>,
        @InjectRepository(Role)
        private readonly roleEntity: Repository<Role>,
        @InjectRepository(StatusDay)
        private readonly statusDay: Repository<StatusDay>
    ){}

async addDay(dto: CreateDayDto){
  
    const role = await this.roleEntity.findOne({where:{id: 2}})
    if(!role){throw new NotFoundException("Role not founded")}
    const find_administrator = await this.staffEntity.findOne({where:{id: dto.administrator_id, role: role}})
    if(!find_administrator){throw new NotFoundException('administator not founded')}
    const new_day = await this.dayEntity.create({finish: null, administrator: find_administrator})
    const saved_day = await this.dayEntity.save(new_day)
    
    await this.statusDay.update({ id: 1 }, { is_open: true, day_id: saved_day.id });

    return saved_day
}

async closeDay(){
    const ex = await this.dayEntity.findOne({where: {finish: IsNull()}})
    console.log(ex)
    await this.dayEntity.update({id: ex?.id}, { finish: new Date()})
    await this.statusDay.update({id: 1}, {is_open: false, day_id: null})
    return {message: 'day closed'}
}
}
