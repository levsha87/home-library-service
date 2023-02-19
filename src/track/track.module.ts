import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { DbModule } from 'src/db/db.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [DbModule],
  controllers: [TrackController],
  providers: [TrackService, PrismaService],
})
export class TrackModule {}
