import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { AlbumDtoInterface, UpdateAlbumInterface } from './album.interface';

export class CreateAlbumDto implements AlbumDtoInterface {
  @IsNotEmpty({ message: 'The album should have a name' })
  @IsString({ message: 'Should be a string type' })
  name: string;

  @IsNotEmpty({ message: 'The album should have a year' })
  @IsNumber()
  year: number;

  @IsOptional()
  @IsString({ message: 'UUID should be a string type' })
  @IsUUID()
  artistId: string;
}

export class UpdateAlbumDto implements UpdateAlbumInterface {
  @IsOptional()
  @IsString({ message: 'Name should be a string type' })
  name: string;

  @IsOptional()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsString({ message: 'UUID should be a string type' })
  @IsUUID()
  artistId: string;
}
