import { Injectable } from '@nestjs/common';
import {
  ArtistDTOInterface,
  ArtistInterface,
  UpdateArtistInterface,
} from './artist.interface';
import { Artist } from './artist.entity';
import { DbService } from 'src/db/db.service';
import { throwError404, validateUUID } from 'src/helpers';

@Injectable()
export class ArtistService {
  constructor(private dbService: DbService) {}

  getArtists(): ArtistInterface[] {
    return this.dbService.getArtists();
  }

  getArtistById(id: string): ArtistInterface {
    validateUUID(id);
    const artist = this.getArtists().find((artist) => artist.id === id);
    if (!artist) throwError404('Artist not found');
    return artist;
  }

  createArtist(artistDTO: ArtistDTOInterface): ArtistInterface {
    const artist = new Artist(artistDTO);
    this.dbService.addArtist(artist);

    return artist;
  }

  updateArtist(
    updateArtistDto: UpdateArtistInterface,
    id: string,
  ): ArtistInterface {
    const artist = this.getArtistById(id);

    for (let key in updateArtistDto) {
      artist[key] = updateArtistDto[key];
    }

    return artist;
  }

  removeArtist(id: string): void {
    const currentArtist = this.getArtistById(id);
    const index = this.getArtists().findIndex(
      (artist) => artist.id === currentArtist.id,
    );

    this.dbService.removeArtist(index, id);
  }
}
