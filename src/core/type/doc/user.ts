import {
  ArrayNotEmpty,
  IsArray,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Contributor } from '@core/type/contributor';

export class UpdateUserBody {
  @IsString()
  @ApiProperty({ type: 'string' })
  avatar: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  bio: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  name: string;
}
