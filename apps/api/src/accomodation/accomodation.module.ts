import { Module } from '@nestjs/common';
import { AccomodationService } from './accomodation.service';
import { PrismaModule } from '@secretlab/prisma/dist';

@Module({
  imports: [PrismaModule],
  providers: [AccomodationService],
  exports: [AccomodationService]
})
export class AccomodationModule {}
