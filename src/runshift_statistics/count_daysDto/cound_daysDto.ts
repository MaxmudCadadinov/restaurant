import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsNumber, IsOptional } from "class-validator";

export class CoundDaysDto{

    @ApiPropertyOptional()
    @IsDateString()
    start_day: string

    @ApiPropertyOptional()
    @IsDateString()
    end_day: string

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    staff_id: number
}

