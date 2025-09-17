import { Injectable } from '@nestjs/common';
import { Tables } from './table_entity/table.entity'
import { CreateTableDto } from './tabledto/create_tabledto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';



@Injectable()
export class TableService {
    constructor (
        @InjectRepository(Tables)
        private readonly tablesEntity: Repository<Tables>){}

    
        async add_table(dto: CreateTableDto){
            const new_table = await this.tablesEntity.create({name: dto.name})
            const saved_table = await this.tablesEntity.save(new_table)
            return saved_table
        }
}
