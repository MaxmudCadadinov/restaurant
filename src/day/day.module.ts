import { Module } from '@nestjs/common';
import { DayController } from './day.controller';
import { DayService } from './day.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Day } from './dayEntity/day.entity'
import { Staff } from 'src/staff/staff.entity/staff.entity';
import { Role } from '../role/role.entity'
import { StatusDay } from './dayEntity/statusDay.entity'


@Module({
  imports: [
    TypeOrmModule.forFeature([Day, Staff, Role, StatusDay])
  ],
  controllers: [DayController],
  providers: [DayService]
})
export class DayModule {}
