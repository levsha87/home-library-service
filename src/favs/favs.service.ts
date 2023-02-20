import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FavoritesRepsonseInterface } from './favs.interface';
import { validateUUID } from 'src/helpers';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavsService {
  constructor(private prismaService: PrismaService) {}

  async getFavs() {
    const response = {
      artists: [],
      albums: [],
      tracks: [],
    };

    const favsArtistsId = await this.prismaService.favoritesArtists.findMany();
    const allArtists = await this.prismaService.artist.findMany();

    favsArtistsId.forEach((favsArtistId) => {
      const [uniqueArtist] = allArtists.filter((artist) => {
        return artist.id === favsArtistId.artistId;
      });

      if (uniqueArtist) response.artists.push(uniqueArtist);
    });

    const favsAlbumsId = await this.prismaService.favoritesAlbums.findMany();
    const allAlbums = await this.prismaService.album.findMany();

    favsAlbumsId.forEach((favsAlbumId) => {
      const [uniqueAlbum] = allAlbums.filter((album) => {
        return album.id === favsAlbumId.albumId;
      });

      if (uniqueAlbum) response.albums.push(uniqueAlbum);
    });

    const favTracksId = await this.prismaService.favoritesTracks.findMany();
    const allTracks = await this.prismaService.track.findMany();

    favTracksId.forEach((favTrackId) => {
      const [uniqueTrack] = allTracks.filter((track) => {
        return track.id === favTrackId.trackId;
      });

      if (uniqueTrack) response.tracks.push(uniqueTrack);
    });

    return response;
  }

  async addTrackToFavs(id: string) {
    validateUUID(id);

    const currentTrack = await this.prismaService.track.findUnique({
      where: {
        id,
      },
    });

    if (!currentTrack)
      throw new HttpException(
        'Track is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const isTrackInFavs = await this.prismaService.favoritesTracks
      .findMany()
      .then((tracksIds) => tracksIds.find((trackId) => trackId.trackId === id));

    if (!isTrackInFavs) {
      return await this.prismaService.favoritesTracks.create({
        data: { trackId: id },
      });
    } else {
      return 'Track has already existed in Favs';
    }
  }

  async addAlbumToFavs(id: string) {
    validateUUID(id);

    const currentAlbum = await this.prismaService.album.findUnique({
      where: {
        id,
      },
    });

    if (!currentAlbum)
      throw new HttpException(
        'Album is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const isAlbumInFavs = await this.prismaService.favoritesAlbums
      .findMany()
      .then((albumsIds) => albumsIds.find((albumId) => albumId.albumId === id));

    if (!isAlbumInFavs) {
      return await this.prismaService.favoritesAlbums.create({
        data: {
          albumId: id,
        },
      });
    } else {
      return 'Album has already existed in Favs';
    }
  }

  async addArtistToFavs(id: string) {
    validateUUID(id);

    const currentArtist = await this.prismaService.artist.findUnique({
      where: {
        id,
      },
    });

    if (!currentArtist)
      throw new HttpException(
        'Artist is not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const isArtistInFavs = await this.prismaService.favoritesArtists
      .findMany()
      .then((artistsIds) =>
        artistsIds.find((artistId) => artistId.artistId === id),
      );

    if (!isArtistInFavs) {
      return await this.prismaService.favoritesArtists.create({
        data: {
          artistId: id,
        },
      });
    } else {
      return 'Artist has already existed in Favs';
    }
  }

  async removeTrackFromFavs(id: string) {
    validateUUID(id);

    const isTrackInFavs = await this.prismaService.favoritesTracks
      .findMany()
      .then((tracksIds) => tracksIds.find((trackId) => trackId.trackId === id));

    if (!isTrackInFavs) {
      throw new HttpException('Track is not found', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.favoritesTracks.delete({
      where: {
        trackId: id,
      },
    });
  }

  async removeAlbumFromFavs(id: string) {
    validateUUID(id);

    const isAlbumInFavs = await this.prismaService.favoritesAlbums
      .findMany()
      .then((albumsIds) => albumsIds.find((albumId) => albumId.albumId === id));

    if (!isAlbumInFavs) {
      throw new HttpException('Album is not found', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.favoritesAlbums.delete({
      where: {
        albumId: id,
      },
    });
  }

  async removeArtistFromFavs(id: string) {
    validateUUID(id);

    const isArtistInFavs = await this.prismaService.favoritesArtists
      .findMany()
      .then((artistsIds) =>
        artistsIds.find((artistId) => artistId.artistId === id),
      );

    if (!isArtistInFavs) {
      throw new HttpException('Artist is not found', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.favoritesArtists.delete({
      where: {
        artistId: id,
      },
    });
  }
}
