import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';
import { DbModule } from 'src/db/db.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [DbModule],
  controllers: [FavsController],
  providers: [
    FavsService,
    AlbumService,
    TrackService,
    ArtistService,
    PrismaService,
  ],
})
export class FavsModule {}
