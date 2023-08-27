import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ContributorListQuery {
  @IsString()
  @ApiProperty({ type: 'string' })
  projectId: string;
}
