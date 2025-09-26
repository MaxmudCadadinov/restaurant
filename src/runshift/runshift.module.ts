import { Module } from '@nestjs/common';
import { RunshiftService } from './runshift.service';
import { RunshiftController } from './runshift.controller';
import { Staff } from 'src/staff/staff.entity/staff.entity';
import { Runshift } from './runshift.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusDay } from 'src/day/dayEntity/statusDay.entity';
import { Day } from 'src/day/dayEntity/day.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Staff, Runshift, StatusDay, Day])],
  controllers: [RunshiftController],
  providers: [RunshiftService],
})
export class RunshiftModule {}
