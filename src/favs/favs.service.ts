import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FavoritesRepsonseInterface } from './favs.interface';
import { DbService } from 'src/db/db.service';
import { validateUUID } from 'src/helpers';

@Injectable()
export class FavsService {
  constructor(private dbService: DbService) {}

  getFavs(): FavoritesRepsonseInterface {
    return this.dbService.getFavsResponse();
  }

  addTrackToFavs(id: string) {
    validateUUID(id);

    const currentTrack = this.dbService
      .getTracks()
      .find((track) => track.id === id);

    if (!currentTrack)
      throw new HttpException(
        'Track is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const isTrackInFavs = this.dbService
      .getFavsCollection()
      .tracks.find((trackId) => trackId === id);

    if (!isTrackInFavs) {
      this.dbService.addTrackToFavs(id);
    } else {
      return 'Track has already existed in Favs';
    }
  }

  addAlbumToFavs(id: string) {
    validateUUID(id);

    const currentAlbum = this.dbService
      .getAlbums()
      .find((album) => album.id === id);

    if (!currentAlbum)
      throw new HttpException(
        'Album is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const isAlbumInFavs = this.dbService
      .getFavsCollection()
      .albums.find((albumId) => albumId === id);

    if (!isAlbumInFavs) {
      this.dbService.addAlbumToFavs(id);
    } else {
      return 'Album has already existed in Favs';
    }
  }

  addArtistToFavs(id: string) {
    validateUUID(id);

    const currentArtist = this.dbService
      .getArtists()
      .find((artist) => artist.id === id);

    if (!currentArtist)
      throw new HttpException(
        'Artist is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const isArtistInFavs = this.dbService
      .getFavsCollection()
      .artists.find((artistId) => artistId === id);

    if (!isArtistInFavs) {
      this.dbService.addArtistToFavs(id);
    } else {
      return 'Artist has already existed in Favs';
    }
  }

  removeTrackFromFavs(id: string) {
    validateUUID(id);

    const isTrackInFavs = this.dbService
      .getFavsCollection()
      .tracks.find((trackId) => trackId === id);

    if (!isTrackInFavs) {
      throw new HttpException('Track is not found', HttpStatus.NOT_FOUND);
    }

    this.dbService.removeTrackFromFavs(id);
  }

  removeAlbumFromFavs(id: string) {
    validateUUID(id);

    const isAlbumInFavs = this.dbService
      .getFavsCollection()
      .albums.find((albumId) => albumId === id);

    if (!isAlbumInFavs) {
      throw new HttpException('Album is not found', HttpStatus.NOT_FOUND);
    }

    this.dbService.removeAlbumFromFavs(id);
  }

  removeArtistFromFavs(id: string) {
    validateUUID(id);

    const isArtistInFavs = this.dbService
      .getFavsCollection()
      .artists.find((artistId) => artistId === id);

    if (!isArtistInFavs) {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }

    this.dbService.removeArtistFromFavs(id);
  }
}
