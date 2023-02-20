import { Injectable } from '@nestjs/common';
import { AlbumInterface } from 'src/album/album.interface';
import { ArtistInterface } from 'src/artist/artist.interface';
import {
  FavoritesInterface,
  FavoritesRepsonseInterface,
} from 'src/favs/favs.interface';
import { TrackInterface } from 'src/track/track.interface';
import { UserInterface } from 'src/user/user.interface';

@Injectable()
export class DbService {
  private USERS: UserInterface[] = [];
  private ARTISTS: ArtistInterface[] = [];
  private ALBUMS: AlbumInterface[] = [];
  private TRACKS: TrackInterface[] = [];
  private FAVS: FavoritesInterface = {
    albums: [],
    tracks: [],
    artists: [],
  };

  private FAVS_RESPONSE: FavoritesRepsonseInterface = {
    albums: [],
    tracks: [],
    artists: [],
  };

  getUsers() {
    return this.USERS;
  }

  addUser(user: UserInterface) {
    this.USERS.push(user);
  }

  removeUser(index: number) {
    this.USERS.splice(index, 1);
  }

  getArtists() {
    return this.ARTISTS;
  }

  addArtist(artist: ArtistInterface) {
    this.ARTISTS.push(artist);
  }

  removeArtist(index: number, id: string): void {
    this.ARTISTS.splice(index, 1);
    this.FAVS.artists = [
      ...this.FAVS.artists.filter((artistId) => artistId !== id),
    ];

    this.FAVS_RESPONSE.artists = [
      ...this.FAVS_RESPONSE.artists.filter((artist) => artist.id !== id),
    ];

    this.TRACKS.map((track) => {
      if (track.artistId === id) track.artistId = null;
    });

    this.ALBUMS.map((album) => {
      if (album.artistId === id) album.artistId = null;
    });
  }

  getTracks() {
    return this.TRACKS;
  }

  addTrack(track: TrackInterface) {
    this.TRACKS.push(track);
  }

  removeTrack(index: number, id: string) {
    this.TRACKS.splice(index, 1);
    this.FAVS.tracks = [
      ...this.FAVS.tracks.filter((trackId) => trackId !== id),
    ];
    this.FAVS_RESPONSE.tracks = [
      ...this.FAVS_RESPONSE.tracks.filter((track) => track.id !== id),
    ];
  }

  getAlbums() {
    return this.ALBUMS;
  }

  addAlbum(album: AlbumInterface) {
    this.ALBUMS.push(album);
  }

  removeAlbum(index: number, id: string) {
    this.ALBUMS.splice(index, 1);
    this.FAVS.albums = [
      ...this.FAVS.albums.filter((albumId) => albumId !== id),
    ];

    this.FAVS_RESPONSE.albums = [
      ...this.FAVS_RESPONSE.albums.filter((album) => album.id !== id),
    ];

    this.TRACKS.map((track) => {
      if (track.albumId === id) track.albumId = null;
    });
  }

  getFavoritsArtists() {
    return this.FAVS.artists.forEach((artistId) => {
      this.FAVS_RESPONSE.artists.push(
        this.ARTISTS.find((artist) => artist.id === artistId),
      );
    });
  }

  getFavoritsAlbums() {
    return this.FAVS.albums.forEach((albumId) => {
      this.FAVS_RESPONSE.albums.push(
        this.ALBUMS.find((album) => album.id === albumId),
      );
    });
  }

  getFavoritsTracks() {
    return this.FAVS.tracks.forEach((trackId) => {
      this.FAVS_RESPONSE.tracks.push(
        this.TRACKS.find((track) => track.id === trackId),
      );
    });
  }

  getFavsResponse(): FavoritesRepsonseInterface {
    this.getFavoritsAlbums();
    this.getFavoritsArtists();
    this.getFavoritsTracks();

    return this.FAVS_RESPONSE;
  }

  getFavsCollection() {
    return this.FAVS;
  }

  addTrackToFavs(id: string) {
    this.FAVS.tracks.push(id);
  }

  removeTrackFromFavs(id: string) {
    this.FAVS.tracks = [
      ...this.FAVS.tracks.filter((trackId) => trackId !== id),
    ];
  }

  addAlbumToFavs(id: string) {
    this.FAVS.albums.push(id);
  }

  removeAlbumFromFavs(id: string) {
    this.FAVS.albums = [
      ...this.FAVS.albums.filter((albumId) => albumId !== id),
    ];
  }

  addArtistToFavs(id: string) {
    this.FAVS.artists.push(id);
  }

  removeArtistFromFavs(id: string) {
    this.FAVS.artists = [
      ...this.FAVS.artists.filter((artistId) => artistId !== id),
    ];
  }
}
