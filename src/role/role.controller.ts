import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto, FilterRoleDto} from './roleDto/roleDto'
import { RoleService } from './role.service'



@Controller('role')
export class RoleController {
    constructor(
        private readonly roleService: RoleService){}

    @Post('/add_role')
    async add_role(@Body() dto: CreateRoleDto){
        return await this.roleService.add_role(dto)
    }

    @Patch('/update_role/:id')
    async update_role(@Body() dto: UpdateRoleDto, @Param('id', ParseIntPipe) id: Number){
       return await this.roleService.updateRole(dto, id)
    }

    @Get('/all_roles')
    async get_all_roles(@Query() dto: FilterRoleDto){
        return await this.roleService.all_roles(dto)
    }

    @Delete('/delete_role/:id')
    async delete_role(@Param('id', ParseIntPipe) id: number){
        return await this.roleService.delete_role(id)
    }
}
