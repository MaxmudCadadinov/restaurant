import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWeekSmenaDto } from './smenaDto/CreateWeekDtoSmena';
import { CreateMonthSmenaDto } from './smenaDto/CreateMonthDtoSmena';
import { Smena } from './smena.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateWeekSmenaDto } from '../smena/smenaDto/UpdateWeekDto';
import { UpdateMonthSmenaDto } from '../smena/smenaDto/UpdateMonthDtoSmena';




@Injectable()
export class SmenaService {
    constructor(@InjectRepository(Smena)
    private readonly smenaEntity: Repository<Smena>,

){}

    async createMonthSmena(dto: CreateMonthSmenaDto){
        const smena = await this.smenaEntity.create({
            name: dto.name,
            month_days: dto.month_days,
            time_start: dto.time_start,
            time_finish: dto.time_finish
        })
        return await this.smenaEntity.save(smena)
        }


    async createWeekSmena(dto: CreateWeekSmenaDto){
        const smena = await this.smenaEntity.create({
            name: dto.name,
            week_days: dto.weeks_day,
            time_start: dto.time_start,
            time_finish: dto.time_finish
        })

        return await this.smenaEntity.save(smena)

        
    }

    

        
    async updateWeekSmena(dto: UpdateWeekSmenaDto, id: number){
        const smena = await this.smenaEntity.findOne({where: {id}})
        if(!smena){throw new NotFoundException('Smena not found')};
        
        if(dto.name){smena.name = dto.name;};
        if(dto.weeks_day){smena.week_days = dto.weeks_day}
        if(dto.time_start){smena.time_start = dto.time_start}
        if(dto.time_finish){smena.time_finish = dto.time_finish}
        
        return await this.smenaEntity.save(smena)
        
    }

    async updateMonthSmena(dto: UpdateMonthSmenaDto, id: number){
        const smena = await this.smenaEntity.findOne({where: {id}})
        if(!smena){throw new NotFoundException('Smena not found')};
        
        if(dto.name){smena.name = dto.name;};
        if(dto.month_days){smena.month_days = dto.month_days}
        if(dto.time_start){smena.time_start = dto.time_start}
        if(dto.time_finish){smena.time_finish = dto.time_finish}
        
        return await this.smenaEntity.save(smena)
        
    }
}
