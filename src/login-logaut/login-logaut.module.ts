import { Module } from '@nestjs/common';
import { LoginLogautService } from './login-logaut.service';
import { LoginLogautController } from './login-logaut.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from 'src/staff/staff.entity/staff.entity';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([Staff]),
  JwtModule.register({
    secret: process.env.ACCESS_TOKEN_SECRET
  })  
],
  controllers: [LoginLogautController],
  providers: [LoginLogautService],
})
export class LoginLogautModule {}
