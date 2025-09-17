import { Controller, Post, Body } from '@nestjs/common';
import { CreateTypeMenuDto } from './typeMenu.dto.ts/createTypeMenu.dto'
import { TypeMenuService } from './type_menu.service'


@Controller('type-menu')
export class TypeMenuController {
    constructor(private readonly typeMenuService: TypeMenuService){}

    @Post('/addTypeMenu')
    async addTypeMenu(@Body() dto: CreateTypeMenuDto){
        return await this.typeMenuService.addTypeMenu(dto)
    }
}
