import { Controller, Body, Post } from '@nestjs/common';
import { CreateStaffDto } from './staff.dto/createStaff.dto'
import { StaffService } from './staff.service'

@Controller('staff')
export class StaffController {
    constructor(private readonly staffService: StaffService){}


    @Post('/addStaff')
    async addStaff(@Body() dto: CreateStaffDto){
        return await this.staffService.addStaff(dto)
    }
}
