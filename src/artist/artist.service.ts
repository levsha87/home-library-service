import { Injectable } from '@nestjs/common';
import {
  ArtistDTOInterface,
  ArtistInterface,
  UpdateArtistInterface,
} from './artist.interface';
import { throwError404, validateUUID } from 'src/helpers';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistService {
  private artists: ArtistInterface[] = [];

  getArtists(): ArtistInterface[] {
    return this.artists;
  }

  getArtistById(id: string): ArtistInterface {
    validateUUID(id);
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) throwError404('Artist not found');
    return artist;
  }

  createArtist(artistDTO: ArtistDTOInterface): ArtistInterface {
    const artist = new Artist(artistDTO);
    this.artists.push(artist);

    return artist;
  }

  updateArtist(
    updateArtistDto: UpdateArtistInterface,
    id: string,
  ): ArtistInterface {
    validateUUID(id);
    const artist = this.getArtistById(id);
    for (let key in updateArtistDto) {
      artist[key] = updateArtistDto[key];
    }

    return artist;
  }

  removeArtist(id: string): void {
    validateUUID(id);
    const currentArtist = this.getArtistById(id);
    const index = this.artists.findIndex(
      (artist) => artist.id === currentArtist.id,
    );
    this.artists.splice(index, 1);
  }
}
