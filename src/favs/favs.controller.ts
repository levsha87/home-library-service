import { Controller, Get, HttpCode, Param, Post, Delete } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavoritesRepsonseInterface } from './favs.interface';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get()
  @HttpCode(200)
  async getFavs() {
    return await this.favsService.getFavs();
  }

  @Post('/track/:id')
  @HttpCode(201)
  async addTrackToFavs(@Param('id') id: string) {
    return await this.favsService.addTrackToFavs(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  async removeTrackFromFavs(@Param('id') id: string) {
    return await this.favsService.removeTrackFromFavs(id);
  }

  @Post('/album/:id')
  @HttpCode(201)
  async addAlbumToFavs(@Param('id') id: string) {
    return await this.favsService.addAlbumToFavs(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  async removeAlbumFromFavs(@Param('id') id: string) {
    return await this.favsService.removeAlbumFromFavs(id);
  }

  @Post('/artist/:id')
  @HttpCode(201)
  async addAristToFavs(@Param('id') id: string) {
    return await this.favsService.addArtistToFavs(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  async removeArtistFromFavs(@Param('id') id: string) {
    return await this.favsService.removeArtistFromFavs(id);
  }
}
