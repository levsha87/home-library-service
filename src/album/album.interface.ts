export interface AlbumDtoInterface {
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export interface AlbumInterface extends AlbumDtoInterface {
  id: string;
}

export interface UpdateAlbumInterface {
  name?: string;
  year?: number;
  artistId?: string | null;
}
