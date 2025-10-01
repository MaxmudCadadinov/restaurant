import { Body, Controller, Get } from '@nestjs/common';
import { DayStatisticsService } from './day_statistics.service';
import { Day_stat_dto } from './daystatDto';




@Controller('day-statistics')
export class DayStatisticsController {
  constructor(private readonly dayStatisticsService: DayStatisticsService) {}

  @Get('/daystatistics')
  async daystat(@Body() dto: Day_stat_dto){
    return await this.dayStatisticsService.day_stat(dto)
  }
  
}
