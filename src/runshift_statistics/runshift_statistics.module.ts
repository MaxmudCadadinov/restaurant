import { Module } from '@nestjs/common';
import { RunshiftStatisticsService } from './runshift_statistics.service';
import { RunshiftStatisticsController } from './runshift_statistics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from 'src/staff/staff.entity/staff.entity';
import { Runshift } from 'src/runshift/runshift.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Staff, Runshift])],
  controllers: [RunshiftStatisticsController],
  providers: [RunshiftStatisticsService],
  exports:[RunshiftStatisticsService]
})
export class RunshiftStatisticsModule {}
