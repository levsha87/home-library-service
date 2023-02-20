export interface TrackDTOInterface {
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export interface TrackInterface extends TrackDTOInterface {
  id: string; // uuid v4
}

export interface UpdateTrackInterface {
  name?: string;
  artistId?: string | null;
  albumId?: string | null;
  duration?: number;
}
