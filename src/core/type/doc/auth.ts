import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  signature: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  contributorId: string;
}
