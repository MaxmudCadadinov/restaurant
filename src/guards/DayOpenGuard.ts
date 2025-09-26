import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusDay } from 'src/day/dayEntity/statusDay.entity';
import { Status_day } from 'src/day/dayEntity/statusDay.entity';


@Injectable()
export class DayOpenGuard implements CanActivate {
  constructor(
    @InjectRepository(StatusDay)
    private readonly statusDayRepo: Repository<StatusDay>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const status = await this.statusDayRepo.findOne({ where: { id: 1 } });

    if (!status || status.is_open === Status_day.closed) {
      throw new ForbiddenException('Day is not opened yet');
    }

    return true;
  }
}
