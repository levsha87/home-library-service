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
  getArtists(): ArtistInterface[] {
    return this.artistService.getArtists();
  }

  @Get(':id')
  @HttpCode(200)
  getArtist(@Param('id') id: string): ArtistInterface {
    return this.artistService.getArtistById(id);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  createArtist(@Body() artist: CreateArtistDTO): ArtistInterface {
    return this.artistService.createArtist(artist);
  }

  @Put(':id')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  updateArtist(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDTO,
  ) {
    return this.artistService.updateArtist(updateArtistDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    return this.artistService.removeArtist(id);
  }
}
