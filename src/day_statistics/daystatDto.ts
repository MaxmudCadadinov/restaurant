import { IsDateString } from "class-validator";

export class Day_stat_dto{

    @IsDateString()
    dateTo: Date

    @IsDateString()
    dateFrom: Date
}