import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { RunshiftService } from './runshift.service';
import { JwtGuard } from 'src/guards/GuardJwtToken';
import { DayOpenGuard } from 'src/guards/DayOpenGuard';
import { UpdateRunshiftDTO } from './runshiftDto/updateTimeFinishDto';
import { All_runshiftsDTO } from './runshiftDto/get_all_runshifts_dto';


@Controller('runshift')
export class RunshiftController {
  constructor(private readonly runshiftService: RunshiftService) {}

  @Get('/requestForStart')
  @UseGuards(JwtGuard, DayOpenGuard)
  async findAllStartedShifts(@Req() req: Request){
    const startingUser = (req as any).user.user_id
    return await this.runshiftService.startShiftRequest(startingUser);
  }

  @Post('/run_start/:code')
  @UseGuards(JwtGuard, DayOpenGuard)
  async run_start(@Param('code', ParseIntPipe) code: number, @Req() req: Request){
    const user = (req as any).user.user_id
    return await this.runshiftService.runstart(code, user)
    
  }
  @Post('/deactivate_shift')
  @UseGuards(JwtGuard)
  async deactivate_shift(@Req() req: Request){
    const user = (req as any).user.user_id
    return await this.runshiftService.deactivated_start(user)
  }

  @Patch('update_not_closed_runshifts/:runshiftID')
  @UseGuards(JwtGuard)
  async update_runshift(@Param('runshiftID', ParseIntPipe) runshiftID: number, @Req() req: Request, @Body() dto: UpdateRunshiftDTO){
    const user = (req as any).user.user_id
    return await this.runshiftService.updateRunshift(user, runshiftID, dto)
  }

  @Get('all_runshifts')
  //@UseGuards(JwtGuard)
  async get_all_runshift(@Query() dto: All_runshiftsDTO){
    return await this.runshiftService.all_runshift(dto)
  }
  
}
