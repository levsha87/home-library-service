import { Injectable } from '@nestjs/common';
import {
  ArtistDTOInterface,
  ArtistInterface,
  UpdateArtistInterface,
} from './artist.interface';
import { throwError404, validateUUID } from 'src/helpers';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prismaService: PrismaService) {}

  async getArtists(): Promise<ArtistInterface[]> {
    return await this.prismaService.artist.findMany();
  }

  async getArtistById(id: string): Promise<ArtistInterface> {
    validateUUID(id);
    const artist = await this.prismaService.artist.findUnique({
      where: {
        id: id,
      },
    });
    if (!artist) throwError404('Artist not found');
    return artist;
  }

  async createArtist(artistDTO: ArtistDTOInterface): Promise<ArtistInterface> {
    const artist = await this.prismaService.artist.create({
      data: {
        ...artistDTO,
      },
    });

    return artist;
  }

  async updateArtist(
    updateArtistDto: UpdateArtistInterface,
    id: string,
  ): Promise<ArtistInterface> {
    const artist = await this.getArtistById(id);

    if (artist) {
      const updateArtist = await this.prismaService.artist.update({
        where: {
          id: id,
        },
        data: {
          ...updateArtistDto,
        },
      });

      return updateArtist;
    }
  }

  async removeArtist(id: string): Promise<void> {
    validateUUID(id);
    const currentArtist = await this.getArtistById(id);
    if (currentArtist) {
      await this.prismaService.artist.delete({
        where: {
          id: id,
        },
      });
    }
  }
}
