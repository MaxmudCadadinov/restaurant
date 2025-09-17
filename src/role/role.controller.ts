import { Body, Controller, Post } from '@nestjs/common';
import { CreateRoleDto } from './roleDto/roleDto'
import { RoleService } from './role.service'

@Controller('role')
export class RoleController {
    constructor(
        private readonly roleService: RoleService){}

    @Post('/add_role')
    async add_role(@Body() dto: CreateRoleDto){
        return await this.roleService.add_role(dto)
    }
}
