import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './staff.entity/staff.entity'
import { Role } from '../role/role.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Staff, Role])],
  providers: [StaffService],
  controllers: [StaffController]
})
export class StaffModule {}
