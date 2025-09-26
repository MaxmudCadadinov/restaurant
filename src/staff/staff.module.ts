import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './staff.entity/staff.entity'
import { Role } from '../role/role.entity'
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/guards/jwtStrategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Staff, Role]),
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
    }),
  ],
  providers: [StaffService, JwtStrategy],
  controllers: [StaffController]
})
export class StaffModule {}
