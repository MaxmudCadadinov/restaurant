import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tables } from './table_entity/table.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Tables])],
  providers: [TableService],
  controllers: [TableController]
})
export class TableModule {}
