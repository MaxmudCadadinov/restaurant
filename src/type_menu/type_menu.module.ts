import { Module } from '@nestjs/common';
import { TypeMenuController } from './type_menu.controller';
import { TypeMenuService } from './type_menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeMenu } from './type_menu.entity'

@Module({
  imports:[
    TypeOrmModule.forFeature([TypeMenu])],
  controllers: [TypeMenuController],
  providers: [TypeMenuService]
})
export class TypeMenuModule {}
