import { Controller, Post, Body } from '@nestjs/common';
import { TableService } from './table.service'
import { CreateTableDto } from './tabledto/create_tabledto'



@Controller('table')
export class TableController {

    constructor(private readonly tableService: TableService){}

    @Post('/addTable')
    async addTable(@Body() dto: CreateTableDto){
        return await this.tableService.add_table(dto)
    }
}
