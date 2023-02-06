import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsNotEmptyObject,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { ArtistDTOInterface, UpdateArtistInterface } from './artist.interface';

export class CreateArtistDTO implements ArtistDTOInterface {
  @IsNotEmpty({ message: 'The artist should have a name' })
  @IsString({ message: 'Should be a string type' })
  name: string;

  @IsNotEmpty({ message: 'The artist should have a grammy' })
  @IsBoolean({ message: 'Should be a boolean type' })
  grammy: boolean;
}

export class UpdateArtistDTO implements UpdateArtistInterface {
  @IsOptional()
  @IsString({ message: 'Name should be a string type' })
  name: string;

  @IsOptional()
  @IsBoolean({ message: 'Grammy should be a boolean type' })
  grammy: boolean;
}
