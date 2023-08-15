import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectBody {
  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'string' })
  symbol: string;

  @ApiProperty({ type: 'string' })
  pointConsensus: string;

  @ApiProperty({ type: 'string', required: false })
  logo: string;

  @ApiProperty({ type: 'string', required: false })
  intro: string;
}
