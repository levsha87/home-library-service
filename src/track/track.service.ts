import { Injectable } from '@nestjs/common';
import {
  TrackDTOInterface,
  TrackInterface,
  UpdateTrackInterface,
} from './track.interface';
import { throwError404, validateUUID } from 'src/helpers';
import { Track } from './track.entity';
import { DbService } from 'src/db/db.service';

@Injectable()
export class TrackService {
  constructor(private dbService: DbService) {}

  getTracks(): TrackInterface[] {
    return this.dbService.getTracks();
  }

  getTrackById(id: string): TrackInterface {
    validateUUID(id);

    const currentTrack = this.getTracks().find((track) => track.id === id);
    if (!currentTrack) throwError404('Track not found');
    return currentTrack;
  }

  createTrack(trackDto: TrackDTOInterface): TrackInterface {
    const track = new Track(trackDto);

    this.dbService.addTrack(track);
    return track;
  }

  updateTrack(
    updateTrackDto: UpdateTrackInterface,
    id: string,
  ): TrackInterface {
    const track = this.getTrackById(id);
    for (let key in updateTrackDto) {
      track[key] = updateTrackDto[key];
    }

    return track;
  }

  removeTrack(id: string): void {
    const currentTrack = this.getTrackById(id);
    const index = this.dbService
      .getTracks()
      .findIndex((track) => track.id === currentTrack.id);

    this.dbService.removeTrack(index, id);
  }
}
