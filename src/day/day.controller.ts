import { Controller, Body, Post, Patch, UseGuards } from '@nestjs/common';
import { CreateDayDto } from './day_dto/create_day.dto'
import { DayService } from './day.service'
import { DayClosedGuard } from 'src/guards/DayClosedGuard'; 
import { DayOpenGuard } from 'src/guards/DayOpenGuard'; 

@Controller('day')
export class DayController {
    constructor(private readonly dayService: DayService){}


@UseGuards(DayClosedGuard)
@Post('/addDay')
async addDay(@Body() dto: CreateDayDto){
    return await this.dayService.addDay(dto)
}

@UseGuards(DayOpenGuard)
@Patch('/close_day')
async closeDay(){
    return await this.dayService.closeDay()
}


}
