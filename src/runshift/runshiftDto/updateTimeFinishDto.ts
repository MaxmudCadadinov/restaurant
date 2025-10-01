import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class UpdateRunshiftDTO{
    @ApiPropertyOptional()
    @IsDateString({}, { message: '2025-09-26T15:30:00.000Z' })
    date_finish: string

    @ApiPropertyOptional()
    @IsNumber()
    @Type(() => Number)
    nulling_by_runshift_id

    


}