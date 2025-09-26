import { Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { SmenaService } from './smena.service';
import { CreateMonthSmenaDto } from './smenaDto/CreateMonthDtoSmena';
import { CreateWeekSmenaDto } from './smenaDto/CreateWeekDtoSmena';
import { UpdateMonthSmenaDto } from './smenaDto/UpdateMonthDtoSmena';


@Controller('smena')
export class SmenaController {
  constructor(private readonly smenaService: SmenaService) {}

  @Post('/add_month_smena')
  async createSmena(@Body() dto: CreateMonthSmenaDto) {
    return await this.smenaService.createMonthSmena(dto);
  }

  @Post('/add_week_smena')
  async createWeekSmena(@Body() dto: CreateWeekSmenaDto) {
    return await this.smenaService.createWeekSmena(dto);
  }



  @Patch('/update_week_smena/:id')
  async updateWeekSmena(@Body() dto: CreateWeekSmenaDto, @Param('id', ParseIntPipe) id: number) {
    return await this.smenaService.updateWeekSmena(dto, id);
  }

  @Patch('/update_month_smena/:id')
  async updateMonthSmena(@Body() dto: CreateMonthSmenaDto, @Param('id', ParseIntPipe) id: number) {
    return await this.smenaService.updateMonthSmena(dto, id);
  }
}
