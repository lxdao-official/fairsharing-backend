import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Contributor } from '@core/type/contributor';
import { PaginateQuery } from '@core/type/doc/common';
import { Type } from 'class-transformer';

export class CreateProjectBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  address: string;

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
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  network: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  votePeriod: string;

  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty({ isArray: true })
  contributors: Contributor[];

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', required: false })
  logo: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', required: false })
  intro: string;
}

export class UpdateProjectBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  pointConsensus: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  votePeriod: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  logo: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  intro: string;
}

export class ProjectListQuery extends PaginateQuery {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string' })
  userId: string;
}
