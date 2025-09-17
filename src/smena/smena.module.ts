import { Module } from '@nestjs/common';
import { SmenaController } from './smena.controller';
import { SmenaService } from './smena.service';

@Module({
  controllers: [SmenaController],
  providers: [SmenaService]
})
export class SmenaModule {}
