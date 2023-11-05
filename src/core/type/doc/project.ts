import { Contributor } from '@core/type/contributor';
import { PaginateQuery } from '@core/type/doc/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

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

  @IsOptional()
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

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  voteSystem: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  voteApprove: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  voteThreshold: number;
}

export class UpdateProjectBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  name: string;

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
  wallet: string;
}

export class MintRecordQuery {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string' })
  wallet?: string;
}
