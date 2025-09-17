import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusDay } from 'src/day/dayEntity/statusDay.entity';


@Injectable()
export class DayClosedGuard implements CanActivate {
  constructor(
    @InjectRepository(StatusDay)
    private readonly statusDayRepo: Repository<StatusDay>,
  ) {}

  async canActivate(): Promise<boolean> {
    const status = await this.statusDayRepo.findOne({ where: { id: 1 } });

    if (status && status.is_open === true) {
      throw new ForbiddenException('Day is already opened');
    }

    return true;
  }
}
