import { AuthBody } from '@core/type/doc/auth';
import { PaginateQuery } from '@core/type/doc/common';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentBody extends AuthBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  purpose: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  category: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  chainId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  allocate: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  projectId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  symbol: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  amount: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  txHash: string;

  @ArrayNotEmpty()
  @IsArray()
  @ApiProperty({ isArray: true })
  counterparties: string[];
}

export class PaymentListQuery extends PaginateQuery {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  projectId: string;
}
