import { Injectable } from '@nestjs/common';
import {
  AlbumDtoInterface,
  AlbumInterface,
  UpdateAlbumInterface,
} from './album.interface';
import { throwError404, validateUUID } from 'src/helpers';
import { Album } from './album.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prismaService: PrismaService) {}
  async getAlbums(): Promise<AlbumInterface[]> {
    return await this.prismaService.album.findMany();
  }

  async getAlbumById(id: string): Promise<AlbumInterface> {
    validateUUID(id);

    const currentAlbum = await this.prismaService.album.findUnique({
      where: {
        id: id,
      },
    });

    if (!currentAlbum) throwError404('Album not found');
    return currentAlbum;
  }

  async createAlbum(albumDto: AlbumDtoInterface): Promise<AlbumInterface> {
    const album = await this.prismaService.album.create({
      data: { ...albumDto },
    });

    return album;
  }

  async updateAlbum(
    updateAlbumDto: UpdateAlbumInterface,
    id: string,
  ): Promise<AlbumInterface> {
    const album = await this.getAlbumById(id);

    if (album) {
      const updateAlbum = await this.prismaService.album.update({
        where: {
          id: id,
        },
        data: {
          ...updateAlbumDto,
        },
      });

      return updateAlbum;
    }
  }

  async removeAlbum(id: string): Promise<void> {
    const currentAlbum = await this.getAlbumById(id);

    if (currentAlbum) {
      await this.prismaService.album.delete({
        where: {
          id: id,
        },
      });
    }
  }
}
