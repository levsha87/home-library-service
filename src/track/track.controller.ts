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
  async getTracks(): Promise<TrackInterface[]> {
    return await this.trackService.getTracks();
  }

  @Get(':id')
  @HttpCode(200)
  async getTrackById(@Param('id') id: string): Promise<TrackInterface> {
    return await this.trackService.getTrackById(id);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async createTrack(@Body() track: CreateTrackDto) {
    return await this.trackService.createTrack(track);
  }

  @Put(':id')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async updateTrack(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return await this.trackService.updateTrack(updateTrackDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  async removeTrack(@Param('id') id: string) {
    return await this.trackService.removeTrack(id);
  }
}
