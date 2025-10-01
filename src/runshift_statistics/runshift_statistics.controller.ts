import { Body, Controller, Post } from '@nestjs/common';
import { RunshiftStatisticsService } from './runshift_statistics.service';
import { CoundDaysDto } from './count_daysDto/cound_daysDto';


@Controller('runshift-statistics')
export class RunshiftStatisticsController {
  constructor(private readonly runshiftStatisticsService: RunshiftStatisticsService) {}

  @Post('/count-hoursAndTime')
  async count_H_S(@Body() dto: CoundDaysDto){
    return await this.runshiftStatisticsService.count_days_hours(dto)
  }
}
