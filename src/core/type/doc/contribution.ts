import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Contributor } from '@core/type/contributor';
import { AuthBody } from '@core/type/doc/auth';

export class ContributionListQuery {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  projectId: string;
}

export class UpdateContributionStateBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  type: 'claim';
}

export class CreateContributionBody extends AuthBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  detail: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  proof: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  uId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  projectId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: 'number' })
  credit: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty({ isArray: true })
  toIds: string[];
}
