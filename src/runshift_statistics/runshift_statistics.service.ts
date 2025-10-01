import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Runshift } from 'src/runshift/runshift.entity';
import { Repository } from 'typeorm';
import { CoundDaysDto } from './count_daysDto/cound_daysDto';

import { Staff } from 'src/staff/staff.entity/staff.entity';
import { dataSource } from 'src/data-source';

@Injectable()
export class RunshiftStatisticsService {
    // constructor(
    //     @InjectRepository(Runshift)
    //     private readonly runshiftEntity: Repository<Runshift>,
    //     // @InjectRepository(Staff)
    //     // private readonly staffEntity: Repository<Staff>
    // ) { }


    async count_days_hours(dto: CoundDaysDto) {

        const start = new Date(dto.start_day)
        const finish = new Date(dto.end_day)

        start.setHours(0, 0, 0, 0)
        finish.setHours(23, 59, 59, 999)

        if (dto.staff_id) {
            const staffID = dto.staff_id
            const stat = await dataSource
                .getRepository(Runshift)
                .createQueryBuilder("r")
                .select("COUNT(r.staff_id)", "count_starts")
                .addSelect("COALESCE(SUM(r.working_sec), 0)", "total_working_minutes")
                .where("r.staff_id = :staffId", { staffID})
                .andWhere("r.date_start >= :from", { from: start })
                .andWhere("r.date_finish >= :to", { to: finish })
                .andWhere("r.deactivatedUser != :server", { server: 'server_deactivated' })
                .getRawOne()

            const h = Math.floor(stat.count_starts / 60);
            const m = stat.count_starts % 60;

            // преобразуем в H.MM
            const mFormatted = m < 10 ? `0${m}` : `${m}`;
            const formated_hours = `${h}.${mFormatted}`


            return {
                count_starts: stat.count_starts,
                count_hours: formated_hours
            }



        } else if (!dto.staff_id) {

            const stat = await dataSource
                .getRepository(Runshift)
                .createQueryBuilder("r")
                .select("COUNT(DISTINCT r.staff_id)", "unique_staff")
                .where("r.date_start >= :from", { from: start })
                .andWhere("r.date_finish <= :to", { to: finish })
                .andWhere("r.deactivatedUser != :server", { server: 'server_deactivated' })
                .getRawOne();

            return {total_users: stat.unique_staff}
        }


    }

    hours_count(hours: string[]): string {
        let totalSeconds = 0;

        for (let time of hours) {
            const [h, m, s] = time.split(':').map(Number);
            totalSeconds += h * 3600 + m * 60 + s;
        }

        const totalH = Math.floor(totalSeconds / 3600);
        const totalM = Math.floor((totalSeconds % 3600) / 60);
        const totalS = totalSeconds % 60;

        const pad = (n: number) => n.toString().padStart(2, '0');
        return `${pad(totalH)}:${pad(totalM)}:${pad(totalS)}`;
    }
}



