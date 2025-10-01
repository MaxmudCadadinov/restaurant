import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DeactivatedUser, Runshift } from './runshift.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, IsNull, LessThan, LessThanOrEqual, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { Staff } from 'src/staff/staff.entity/staff.entity';
import { RunshiftCode } from './runshift.entity';
import { StatusDay } from 'src/day/dayEntity/statusDay.entity';
import { Day } from 'src/day/dayEntity/day.entity';
import { Cron } from '@nestjs/schedule';
import { UpdateRunshiftDTO } from './runshiftDto/updateTimeFinishDto';
import { All_runshiftsDTO } from './runshiftDto/get_all_runshifts_dto';
import { RunshiftStatisticsModule } from 'src/runshift_statistics/runshift_statistics.module';
import { RunshiftStatisticsService } from 'src/runshift_statistics/runshift_statistics.service';



@Injectable()
export class RunshiftService {
    constructor(
        @InjectRepository(Runshift)
        private readonly runShiftEntity: Repository<Runshift>,
        @InjectRepository(Staff)
        private readonly staffEntity,
        @InjectRepository(StatusDay)
        private readonly statusDayEntity: Repository<StatusDay>,
        @InjectRepository(Day)
        private readonly dayEntity: Repository<Day>,
      
    ){}


    async startShiftRequest(startingUser){
   
        const ex = await this.runShiftEntity.findOne({where:{staff: {id:Number(startingUser)}, code_status: RunshiftCode.NOT_ACTIVATED, }})
        if(ex){return ex.code}
        const ex2 = await this.runShiftEntity.findOne({where: {staff:{id: Number(startingUser)}, code_status: RunshiftCode.ACTIVATED, date_finish: IsNull()}}) 
        if(ex2){ return 'shift for this staff opened'}
        const expiresAt = new Date()
        expiresAt.setHours(expiresAt.getHours() + 1)
        
        const new_runshify = await this.runShiftEntity.create({
            staff: {id: Number(startingUser)},
            code: Math.floor(10000000 + Math.random() * 90000000),
            code_status: RunshiftCode.NOT_ACTIVATED,
            deadlineCode: expiresAt
          
        })
        return await this.runShiftEntity.save(new_runshify)
        
        
       
    }
        
    
    async runstart(code, user){

        const expiresAt = new Date()
        expiresAt.setHours(expiresAt.getHours() + 15)

        const day_id = (await this.statusDayEntity.findOne({where: {id: 1}}))?.day_id
        if(!day_id){throw new NotFoundException}

        const day = await this.dayEntity.findOne({where: {id: day_id}})
        if(!day){throw new NotFoundException}

        const findCode = await this.runShiftEntity.findOne({where: {code: code, code_status: RunshiftCode.NOT_ACTIVATED}, relations: ['staff']})
        if(!findCode){return {message: 'staff with this code not found'}}

        const activated_user = await this.staffEntity.findOne({where: {id: Number(user)}})
        if(!activated_user){throw new NotFoundException}
        
        findCode.date_start = new Date(),
        findCode.code_status =  RunshiftCode.ACTIVATED
        findCode.activatedAdministator = activated_user
        findCode.day = day
        findCode.deadlineShiftTime = expiresAt
        findCode.deactivatedUser = DeactivatedUser.NOT_DEACTIVATED

        await this.runShiftEntity.save(findCode)
        const shiftStartedStaff = await this.staffEntity.findOne({where:{id: findCode.staff.id}})
        return shiftStartedStaff
    }

    async deactivated_start(user){
        
        const staff = await this.staffEntity.findOne({where: {id:Number(user)}})
        if(!staff){throw new NotFoundException('staff not found')}
        
        const findrunshift = await this.runShiftEntity.findOne({where: {staff: {id: staff.id}, code_status: RunshiftCode.ACTIVATED, date_finish: IsNull(), date_start: Not(IsNull())}})
        if(!findrunshift){throw new NotFoundException('not opened shift')}

        const start_time = findrunshift.date_start!
        const finish_time = new Date()
       
        const w_hours = finish_time.getTime() - start_time.getTime()
        const totalSeconds = Math.floor(w_hours / 60);
        
     

        findrunshift.working_sec = totalSeconds
        findrunshift.deactivatedUser = DeactivatedUser.staff_deactivated
        findrunshift.date_finish = finish_time

        return await this.runShiftEntity.save(findrunshift)
        
    }

    
    
    async updateRunshift(user, runshiftId, dto: UpdateRunshiftDTO){

        const administrator = await this.staffEntity.findOne({where:{id: Number(user)}})
        if(!administrator){throw new NotFoundException}

        const findRunshift = await this.runShiftEntity.findOne({where:{id:Number(runshiftId), code_status: RunshiftCode.ACTIVATED, date_finish: IsNull()}})
        if(!findRunshift){throw new NotFoundException('runshift not found')}

        const start_time = findRunshift.date_start!
        const finish_time = new Date(dto.date_finish)
        
        if (finish_time <= start_time) {throw new BadRequestException('endShift is earlier than the startShift');}

        const w_hours = finish_time.getTime() - start_time.getTime()
        const totalSeconds = Math.floor(w_hours / 60);
        
        findRunshift.date_finish = finish_time
        findRunshift.deactivatedUser = DeactivatedUser.staff_deactivated
        findRunshift.updatedUser = administrator
        findRunshift.update = new Date()
        findRunshift.working_sec = totalSeconds
        return await this.runShiftEntity.save(findRunshift)
        
    }

    async all_runshift(dto: All_runshiftsDTO){
    
        const where: any = {}

    if(dto.staff){
        const staff = await this.staffEntity.findOne({where:{id: dto.staff}})
        if(!staff){throw new NotFoundException("staff not found")}
        where.staff = {id: staff.id}}
        
        
    if(dto.nulling_status){where.nulling_status = dto.nulling_status}
            
    if(dto.from_date_start && dto.to_date_start){
        
        const toDate = new Date(dto.to_date_start);
        const fromDate = new Date(dto.from_date_start)
        toDate.setHours(23, 59, 59, 999)
        fromDate.setHours(0, 0, 0, 0)
        
        where.created = Between(fromDate, toDate )
    }else if(!dto.from_date_start && dto.to_date_start){
        
        const toDate = new Date(dto.to_date_start);
        toDate.setHours(23, 59, 59, 999)

        where.created = LessThanOrEqual(toDate)
    }else if(dto.from_date_start && !dto.to_date_start){
        
        const fromDate = new Date(dto.from_date_start)
        fromDate.setHours(0, 0, 0, 0)
        where.created = MoreThanOrEqual(fromDate)}
    
    




    if(dto.from_date_finish && dto.to_date_finish){
        
        const toDate = new Date(dto.to_date_finish);
        const fromDate = new Date(dto.from_date_finish)
        toDate.setHours(23, 59, 59, 999)
        fromDate.setHours(0, 0, 0, 0)
        
        where.created = Between(fromDate, toDate )
    }else if(!dto.from_date_finish && dto.to_date_finish){
        
        const toDate = new Date(dto.to_date_finish);
        toDate.setHours(23, 59, 59, 999)

        where.created = LessThanOrEqual(toDate)
    }else if(dto.from_date_finish && !dto.to_date_finish){
        
        const fromDate = new Date(dto.from_date_finish)
        fromDate.setHours(0, 0, 0, 0)
        where.created = MoreThanOrEqual(fromDate)}
        
    
    if(dto.day){
        const day = await this.dayEntity.findOne({where:{id: dto.day}})
        if(!day){throw new NotFoundException}
        where.day = day.id
    }

    if(dto.deactivatedUser){where.deactivatedUser = dto.deactivatedUser}
        
    const page = dto.page && dto.page > 0 ? dto.page : 1;
    const limit = dto.limit && dto.limit > 0 ? dto.limit : 10;
    
    const [all_runshift, total] = await this.runShiftEntity.findAndCount({where,
        relations:['day', 'staff'],
        skip: (page - 1) * limit, take: limit, order: { id: 'DESC' }
    })
    return {total: total,all_runshift: all_runshift}
    }



    @Cron('0 */30 * * * *')
    async clearrunshify(){
        console.log("aaaaaaaa")
            const runshift = await this.runShiftEntity.delete({
                code_status: RunshiftCode.NOT_ACTIVATED,
                deadlineCode: LessThan(new Date())
            })
            
        }

    @Cron('0 0 */6 * * *')
    async deactivate_start(){
            const runshift = await this.runShiftEntity.find({where:{
                deadlineShiftTime: LessThan(new Date()), 
                date_finish: IsNull(), 
                deactivatedUser: DeactivatedUser.NOT_DEACTIVATED
            } })

            if(runshift.length > 0){
                for (let shift of runshift){
                    shift.deactivatedUser = DeactivatedUser.server_deactivated
                    shift.date_finish = new Date()
                }
            }

        }

       

        }

