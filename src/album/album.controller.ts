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
  async getAlbums(): Promise<AlbumInterface[]> {
    return await this.albumService.getAlbums();
  }

  @Get(':id')
  @HttpCode(200)
  async getAlbumById(@Param('id') id: string): Promise<AlbumInterface> {
    return await this.albumService.getAlbumById(id);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async createAlbum(@Body() album: CreateAlbumDto): Promise<AlbumInterface> {
    return await this.albumService.createAlbum(album);
  }

  @Put(':id')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async updateAlbum(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumInterface> {
    return await this.albumService.updateAlbum(updateAlbumDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  async removeAlbum(@Param('id') id: string): Promise<void> {
    return await this.albumService.removeAlbum(id);
  }
}
