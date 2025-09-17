import { Module } from '@nestjs/common';
import { StaffWorkersController } from './staff_workers.controller';
import { StaffWorkersService } from './staff_workers.service';

@Module({
  controllers: [StaffWorkersController],
  providers: [StaffWorkersService]
})
export class StaffWorkersModule {}
