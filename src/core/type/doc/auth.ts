import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthBody {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string' })
  signature?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string' })
  operatorId?: string;
}
