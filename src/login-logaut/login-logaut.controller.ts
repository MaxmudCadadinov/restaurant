import { Body, Controller, Post } from '@nestjs/common';
import { LoginLogautService } from './login-logaut.service';
import { LOginUserDto } from './login_userDto';



@Controller('login')
export class LoginLogautController {
  constructor(private readonly loginLogautService: LoginLogautService) {}

  @Post('login_user')
   async login_user(@Body() dto: LOginUserDto){
    return await this.loginLogautService.login_staff(dto)
   }


}
