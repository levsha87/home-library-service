import { Injectable } from '@nestjs/common';
import {
  AlbumDtoInterface,
  AlbumInterface,
  UpdateAlbumInterface,
} from './album.interface';
import { throwError404, validateUUID } from 'src/helpers';
import { Album } from './album.entity';

@Injectable()
export class AlbumService {
  private albums: AlbumInterface[] = [];

  getAlbums(): AlbumInterface[] {
    return this.albums;
  }

  getAlbumById(id: string): AlbumInterface {
    validateUUID(id);

    const currentAlbum = this.albums.find((album) => album.id === id);
    if (!currentAlbum) throwError404('Album not found');
    return currentAlbum;
  }

  createAlbum(albumDto: AlbumDtoInterface): AlbumInterface {
    const album = new Album(albumDto);

    this.albums.push(album);
    return album;
  }

  updateAlbum(
    updateAlbumDto: UpdateAlbumInterface,
    id: string,
  ): AlbumInterface {
    const album = this.getAlbumById(id);
    for (let key in updateAlbumDto) {
      album[key] = updateAlbumDto[key];
    }

    return album;
  }

  removeAlbum(id: string): void {
    const currentAlbum = this.getAlbumById(id);
    const index = this.albums.findIndex(
      (album) => album.id === currentAlbum.id,
    );
    this.albums.splice(index, 1);
  }
}
