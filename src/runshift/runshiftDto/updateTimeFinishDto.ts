import { ApiProperty } from "@nestjs/swagger";
import { IsDateString } from "class-validator";

export class UpdateRunshiftDTO{
    @ApiProperty()
    @IsDateString({}, { message: '2025-09-26T15:30:00.000Z' })
    date_finish: string
}