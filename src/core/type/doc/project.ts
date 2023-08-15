import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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

  @IsString()
  @ApiProperty({ type: 'string', required: false })
  logo: string;

  @IsString()
  @ApiProperty({ type: 'string', required: false })
  intro: string;
}
