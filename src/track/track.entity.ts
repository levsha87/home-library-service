import { TrackInterface, TrackDTOInterface } from './track.interface';
import { v4 } from 'uuid';

export class Track implements TrackInterface {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number

  constructor(track: TrackDTOInterface) {
    this.id = v4();
    this.name = track.name;
    this.artistId = track.artistId || null;
    this.albumId = track.albumId || null;
    this.duration = track.duration;
  }
}
