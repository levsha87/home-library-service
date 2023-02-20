import { v4 } from 'uuid';
import { ArtistInterface, ArtistDTOInterface } from './artist.interface';

export class Artist implements ArtistInterface {
  id: string; // uuid v4
  name: string;
  grammy: boolean;

  constructor(artist: ArtistDTOInterface) {
    this.id = v4();
    this.name = artist.name;
    this.grammy = artist.grammy;
  }
}
