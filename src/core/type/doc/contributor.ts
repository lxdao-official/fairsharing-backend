import {
  ArrayNotEmpty,
  IsArray,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Contributor } from '@core/type/contributor';

export class ContributorListQuery {
  @IsString()
  @ApiProperty({ type: 'string' })
  projectId: string;
}

export class DeleteContributorsBody {
  @ArrayNotEmpty()
  @IsArray()
  @ApiProperty({ isArray: true })
  contributorIds: string[];
}

export class UpdateContributorsBody {
  @ArrayNotEmpty()
  @IsArray()
  @ApiProperty({ isArray: true })
  contributors: Contributor[];

  @IsString()
  @ApiProperty({ type: 'string' })
  projectId: string;
}

export class CreateContributorsBody {
  @IsString()
  @ApiProperty({ type: 'string' })
  projectId: string;

  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty({ isArray: true })
  contributors: Contributor[];
}
