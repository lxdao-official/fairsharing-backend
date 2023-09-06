import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserBody {
  @IsString()
  @ApiProperty({ type: 'string' })
  avatar: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  bio: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  name: string;
}

export class GetSignatureQuery {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  wallet: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: 'number' })
  cId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: 'number' })
  chainId: number;
}
