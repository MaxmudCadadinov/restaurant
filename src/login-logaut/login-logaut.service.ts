import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/staff/staff.entity/staff.entity';
import { Repository } from 'typeorm';
import { LOginUserDto } from './login_userDto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class LoginLogautService {
    constructor(@InjectRepository(Staff)
    private readonly staffEntity: Repository<Staff>,
    private readonly jwtservice: JwtService
){}


async login_staff(dto: LOginUserDto){
    const findStaff = await this.staffEntity.findOne({where: {name: dto.name, password: dto.password}, relations:['role']})
    if (!findStaff){throw new NotFoundException("staff not found")}
    const access_token = this.jwtservice.sign({user_id: findStaff.id, role_name: findStaff.role.name}, {secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: '3h'})
    const refresh_token = this.jwtservice.sign({user_id: findStaff.id, role_name: findStaff.role.name}, {secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: '7d'})
    
    return {access_token: access_token, refresh_token: refresh_token}
}


}
