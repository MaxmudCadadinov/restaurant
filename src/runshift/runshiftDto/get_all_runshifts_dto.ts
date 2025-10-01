import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { DeactivatedUser, Nulling_Status } from "../runshift.entity"; 
import { Type } from "class-transformer";
import { PaginationDto } from "src/paginationDto";

export class All_runshiftsDTO extends PaginationDto{
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    staff: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsDateString()
    from_date_start: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsDateString()
    to_date_start: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsDateString()
    from_date_finish: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsDateString()
    to_date_finish: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    min_working_hours: string
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    max_working_hours: string

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    day: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(DeactivatedUser, {message: 'server_deactivated or staff_deactivated'})
    deactivatedUser: DeactivatedUser

    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(Nulling_Status, {message: 'not_nulling or nulling'})
    nulling_status: Nulling_Status

}