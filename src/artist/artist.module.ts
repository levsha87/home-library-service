import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [ArtistController],
  providers: [ArtistService, PrismaService],
})
export class ArtistModule {}
