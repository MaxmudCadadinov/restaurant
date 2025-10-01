import { Controller, Body, Post, Patch, Get, Query, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { CreateStaffDto } from './staff.dto/createStaff.dto'
import { StaffService } from './staff.service'
import { UpdateStaffDto } from './staff.dto/createStaff.dto'; 
import { FilterStaffDto } from './staff.dto/createStaff.dto'; 
import { Filter } from 'typeorm';



@Controller('staff')
export class StaffController {
    constructor(private readonly staffService: StaffService){}


    @Post('/addStaff')
    async addStaff(@Body() dto: CreateStaffDto){
        return await this.staffService.addStaff(dto)
    }

    @Patch('/update_staff/:id')
    async update_staff(@Body() dto: UpdateStaffDto, @Param('id', ParseIntPipe) id: number){
        return await this.staffService.update_staff(dto, id)
    }

    @Get('/all-staff')
    async get_all_staff(@Query() dto: FilterStaffDto){
        return await this.staffService.get_all_staff(dto)
    }

    @Delete('/delete_staff/:id')
    async delete_staff(@Param('id', ParseIntPipe) id: number){
        return await this.staffService.delete_staff(id)
    }
}
