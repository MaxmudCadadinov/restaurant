import { Module } from '@nestjs/common';
import { DayStatisticsService } from './day_statistics.service';
import { DayStatisticsController } from './day_statistics.controller';
import { Runshift } from 'src/runshift/runshift.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Day } from 'src/day/dayEntity/day.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Runshift, Day]) ],
  controllers: [DayStatisticsController],
  providers: [DayStatisticsService],
})
export class DayStatisticsModule {}
