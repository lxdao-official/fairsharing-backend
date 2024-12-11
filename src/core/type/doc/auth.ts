import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AuthBody {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', description: '暂时不用传' })
  signature?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', description: '当前用户id,' })
  operatorId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', description: '当前用户钱包地址' })
  wallet?: string;
}
