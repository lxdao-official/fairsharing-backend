import {
  ArrayNotEmpty,
  IsArray,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ContributorListQuery {
  @IsString()
  @ApiProperty({ type: 'string' })
  projectId: string;
}

export class DeleteContributorsBody {
  @IsString()
  @ApiProperty({ type: 'string' })
  projectId: string;

  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty({ isArray: true })
  contributors: string[];
}
