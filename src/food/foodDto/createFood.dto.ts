import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsInt, IsString } from 'class-validator';

export class CreateFoodDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  typeId: number; // вместо связи — просто передаём id type_menu
}
