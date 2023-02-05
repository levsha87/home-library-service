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
import { AlbumService } from './album.service';
import { AlbumInterface } from './album.interface';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @HttpCode(200)
  getAlbums(): AlbumInterface[] {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  @HttpCode(200)
  getAlbumById(@Param('id') id: string): AlbumInterface {
    return this.albumService.getAlbumById(id);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  createAlbum(@Body() album: CreateAlbumDto) {
    return this.albumService.createAlbum(album);
  }

  @Put(':id')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  updateAlbum(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.updateAlbum(updateAlbumDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    return this.albumService.removeAlbum(id);
  }
}
