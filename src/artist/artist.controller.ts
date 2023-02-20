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
import { ArtistService } from './artist.service';
import { ArtistInterface } from './artist.interface';
import { CreateArtistDTO, UpdateArtistDTO } from './artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @HttpCode(200)
  async getArtists(): Promise<ArtistInterface[]> {
    return await this.artistService.getArtists();
  }

  @Get(':id')
  @HttpCode(200)
  async getArtist(@Param('id') id: string): Promise<ArtistInterface> {
    return await this.artistService.getArtistById(id);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async createArtist(
    @Body() artist: CreateArtistDTO,
  ): Promise<ArtistInterface> {
    return await this.artistService.createArtist(artist);
  }

  @Put(':id')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async updateArtist(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDTO,
  ): Promise<ArtistInterface> {
    return await this.artistService.updateArtist(updateArtistDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  async removeArtist(@Param('id') id: string): Promise<void> {
    return await this.artistService.removeArtist(id);
  }
}
