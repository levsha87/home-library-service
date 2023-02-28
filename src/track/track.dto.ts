import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { TrackDTOInterface } from './track.interface';

export class CreateTrackDto implements TrackDTOInterface {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID()
  artistId: string;

  @IsOptional()
  @IsUUID()
  albumId: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}

export class UpdateTrackDto implements UpdateTrackDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID()
  artistId: string;

  @IsOptional()
  @IsUUID()
  albumId: string;

  @IsOptional()
  @IsNumber()
  duration: number;
}
