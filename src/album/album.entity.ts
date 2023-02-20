import { v4 } from 'uuid';
import { AlbumDtoInterface, AlbumInterface } from './album.interface';

export class Album implements AlbumInterface {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(album: AlbumDtoInterface) {
    this.id = v4();
    this.name = album.name;
    this.year = album.year;
    this.artistId = album.artistId || null;
  }
}
