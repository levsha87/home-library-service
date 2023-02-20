import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackInterface } from './track.interface';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @HttpCode(200)
  getTracks(): TrackInterface[] {
    return this.trackService.getTracks();
  }

  @Get(':id')
  @HttpCode(200)
  getTrackById(@Param('id') id: string): TrackInterface {
    return this.trackService.getTrackById(id);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  createTrack(@Body() track: CreateTrackDto) {
    return this.trackService.createTrack(track);
  }

  @Put(':id')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  updateTrack(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.updateTrack(updateTrackDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    return this.trackService.removeTrack(id);
  }
}
