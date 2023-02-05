export interface ArtistDTOInterface {
  name: string;
  grammy: boolean;
}

export interface ArtistInterface extends ArtistDTOInterface {
  id: string; // uuid v4
}

export interface UpdateArtistInterface {
  name?: string;
  grammy?: boolean;
}
