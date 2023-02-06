import { AlbumInterface } from 'src/album/album.interface';
import { ArtistInterface } from 'src/artist/artist.interface';
import { TrackInterface } from 'src/track/track.interface';

export interface FavoritesInterface {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface FavoritesRepsonseInterface {
  artists: ArtistInterface[];
  albums: AlbumInterface[];
  tracks: TrackInterface[];
}
