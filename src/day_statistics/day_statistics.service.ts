import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Day } from 'src/day/dayEntity/day.entity';
import { Repository } from 'typeorm';
import { Day_stat_dto } from './daystatDto';
import { dataSource } from 'src/data-source';
import { Runshift } from 'src/runshift/runshift.entity';
import { stat } from 'fs';

@Injectable()
export class DayStatisticsService {
    constructor(
        @InjectRepository(Day)
        private readonly dayEntity:Repository<Day>,
){}

async day_stat(dto: Day_stat_dto){

    const dateFrom = new Date(dto.dateFrom)
    const dateTo = new Date(dto.dateTo)
    dateFrom.setHours(0, 0, 0, 0)
    dateTo.setHours(23, 59, 59, 999)

    const statDay = await dataSource
    .getRepository(Day)
    .createQueryBuilder("d")
    .select("SUM(d.amount)", "total_amount")
    .addSelect("COUNT(d.id)", "count_day")
    .addSelect("AVG(d.amount)", "avg_amount")
    .addSelect("SUM(d.count_chack)", "total_chack")
    .addSelect("AVG(d.count_chack)", "avg_chack")
    .where("d.start >= :from", {from: dateFrom})
    .andWhere("d.start <= :to", {to: dateTo})
    .getRawOne()
    return {
        total_count: statDay.count_day,
        total_amount: statDay.total_amount,
        avg_amount: statDay.avg_amount,
        total_chack: statDay.total_chack,
        avg_chack: statDay.avg_chack
    }

}

}
