import { Injectable } from '@nestjs/common';
import {
  TrackDTOInterface,
  TrackInterface,
  UpdateTrackInterface,
} from './track.interface';
import { throwError404, validateUUID } from 'src/helpers';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prismaService: PrismaService) {}

  async getTracks(): Promise<TrackInterface[]> {
    return await this.prismaService.track.findMany();
  }

  async getTrackById(id: string): Promise<TrackInterface> {
    validateUUID(id);
    const currentTrack = await this.prismaService.track.findUnique({
      where: {
        id: id,
      },
    });

    if (!currentTrack) throwError404('Track not found');
    return currentTrack;
  }

  async createTrack(trackDto: TrackDTOInterface): Promise<TrackInterface> {
    const track = await this.prismaService.track.create({
      data: {
        ...trackDto,
      },
    });

    return track;
  }

  async updateTrack(
    updateTrackDto: UpdateTrackInterface,
    id: string,
  ): Promise<TrackInterface> {
    const track = await this.getTrackById(id);

    if (track) {
      const updateTrack = await this.prismaService.track.update({
        where: {
          id: id,
        },
        data: {
          ...updateTrackDto,
        },
      });

      return updateTrack;
    }
  }

  async removeTrack(id: string): Promise<void> {
    validateUUID(id);
    const currentTrack = await this.getTrackById(id);
    if (currentTrack) {
      await this.prismaService.track.delete({
        where: {
          id: id,
        },
      });
    }
  }
}
