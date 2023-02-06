import { Injectable } from '@nestjs/common';
import {
  AlbumDtoInterface,
  AlbumInterface,
  UpdateAlbumInterface,
} from './album.interface';
import { throwError404, validateUUID } from 'src/helpers';
import { Album } from './album.entity';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AlbumService {
  constructor(private dbService: DbService) {}
  getAlbums(): AlbumInterface[] {
    return this.dbService.getAlbums();
  }

  getAlbumById(id: string): AlbumInterface {
    validateUUID(id);

    const currentAlbum = this.getAlbums().find((album) => album.id === id);
    if (!currentAlbum) throwError404('Album not found');
    return currentAlbum;
  }

  createAlbum(albumDto: AlbumDtoInterface): AlbumInterface {
    const album = new Album(albumDto);

    this.dbService.addAlbum(album);
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
    const index = this.getAlbums().findIndex(
      (album) => album.id === currentAlbum.id,
    );

    this.dbService.removeAlbum(index, id);
  }
}
