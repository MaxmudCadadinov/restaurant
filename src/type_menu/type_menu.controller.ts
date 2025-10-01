import { Controller, Post, Body, Patch, Get, Query, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { CreateTypeMenuDto, FilterTypeMenuDto, UpdateTypeMenuDto } from './typeMenu.dto.ts/createTypeMenu.dto'
import { TypeMenuService } from './type_menu.service'


@Controller('type-menu')
export class TypeMenuController {
    constructor(private readonly typeMenuService: TypeMenuService){}

    @Post('/addTypeMenu')
    async addTypeMenu(@Body() dto: CreateTypeMenuDto){
        return await this.typeMenuService.addTypeMenu(dto)
    }

    @Patch('/update_type_menu/:id')
    async update_type_menu(@Body() dto: UpdateTypeMenuDto, @Param('id', ParseIntPipe) id: number){
        return await this.typeMenuService.update_type_menu(dto, id)
    }

    @Get('/all_type_menu')
    async all_type_menu(@Query() dto: FilterTypeMenuDto){
        return await this.typeMenuService.all_type_menu(dto)
    }

    @Delete('delete_type_menu/:id')
    async delete_type_menu(@Param('id', ParseIntPipe) id: Number){
        return await this.typeMenuService.delete_type_menu(id)
    }
}
