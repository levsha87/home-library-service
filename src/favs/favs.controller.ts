import { Controller, Get, HttpCode, Param, Post, Delete } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavoritesRepsonseInterface } from './favs.interface';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get()
  @HttpCode(200)
  getFavs(): FavoritesRepsonseInterface {
    return this.favsService.getFavs();
  }

  @Post('/track/:id')
  @HttpCode(201)
  addTrackToFavs(@Param('id') id: string) {
    return this.favsService.addTrackToFavs(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  removeTrackFromFavs(@Param('id') id: string) {
    return this.favsService.removeTrackFromFavs(id);
  }

  @Post('/album/:id')
  @HttpCode(201)
  addAlbumToFavs(@Param('id') id: string) {
    return this.favsService.addAlbumToFavs(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  removeAlbumFromFavs(@Param('id') id: string) {
    return this.favsService.removeAlbumFromFavs(id);
  }

  @Post('/artist/:id')
  @HttpCode(201)
  addAristToFavs(@Param('id') id: string) {
    return this.favsService.addArtistToFavs(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  removeArtistFromFavs(@Param('id') id: string) {
    return this.favsService.removeArtistFromFavs(id);
  }
}
