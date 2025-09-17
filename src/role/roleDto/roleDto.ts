// create-role.dto.ts
import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

}
