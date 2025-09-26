import { Module } from '@nestjs/common';
import { SmenaService } from './smena.service';
import { SmenaController } from './smena.controller';
import { Smena } from './smena.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([Smena])],
  controllers: [SmenaController],
  providers: [SmenaService],
})
export class SmenaModule {}
