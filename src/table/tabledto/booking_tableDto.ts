import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString,  } from 'class-validator';

export class BookingDateDto {
  @ApiPropertyOptional({
    example: '2025-09-19T18:30:00',
    description: 'Дата и время бронирования стола',
  })
  @IsDateString()
  booking_table_date: string

}