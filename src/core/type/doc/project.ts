import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Contributor } from '@core/type/contributor';

export class CreateProjectBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  symbol: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  pointConsensus: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: 'number' })
  network: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: 'number' })
  votePeriod: number;

  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty({ isArray: true })
  contributors: Contributor[];

  @IsString()
  @ApiProperty({ type: 'string', required: false })
  logo: string;

  @IsString()
  @ApiProperty({ type: 'string', required: false })
  intro: string;
}
