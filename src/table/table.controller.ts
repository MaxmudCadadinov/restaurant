import { Controller, Post, Body, Patch, Param, ParseIntPipe, Delete, Get, Query } from '@nestjs/common';
import { TableService } from './table.service'
import { CreateTableDto, FilterTableDto, UpdateTableDto } from './tabledto/create_tabledto'
import { BookingDateDto } from './tabledto/booking_tableDto'; 


@Controller('table')
export class TableController {

    constructor(private readonly tableService: TableService){}

    @Post('/addTable')
    async addTable(@Body() dto: CreateTableDto){
        return await this.tableService.add_table(dto)
    }
    @Patch('/booking_table/:id')
    async booking(@Param('id', ParseIntPipe) id: string, @Body()dto: BookingDateDto){
        return await this.tableService.booking_table(id, dto)
    }

    @Delete('unBooking_table/:id')
    async unbooking(@Param('id', ParseIntPipe) id: string){

        return await this.tableService.unbooking_table(id)
    }

    @Patch('/update_Booking_time/:id')
    async updateBooking(@Param('id', ParseIntPipe) id: string, @Body()dto: BookingDateDto){
        return await this.tableService.updateBookingTime(id, dto)
    }

    @Patch('/close_table/:id')
    async close(@Param('id', ParseIntPipe) id: string){
        return await this.tableService.close_table(id)
    }

    @Patch('/chacking_close/:id')
    async close_chack(@Param('id', ParseIntPipe) id: string){
        return this.tableService.close_chack(id)
    }




    
    @Get('/get_all_tables')
    async all_tables(@Query() dto: FilterTableDto){
        return await this.tableService.all_tables(dto)
    }

    @Delete('/delete_table/:id')
    async delete_table(@Param('id', ParseIntPipe) id: number){
        return await this.tableService.delete_table(id)
    }
    
}
