import { AuthBody } from '@core/type/doc/auth';
import { PaginateQuery } from '@core/type/doc/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PoolListQuery extends PaginateQuery {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'project id(同时也是 project address)',
  })
  projectId: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number', description: '筛选激励池创建起始时间' })
  endDateFrom?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number', description: '筛选激励池创建结束时间' })
  endDateTo?: number;
}

export class ClaimStatusQuery {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'project id(同时也是 project address)',
  })
  projectId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', description: '要获取的钱包地址 claim 状态' })
  wallet: string;
}

export class CreatePoolBody extends AuthBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', description: '经过 EAS 创建的 allocation id' })
  allocationId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'project id(同时也是 project address)',
  })
  projectId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: '工厂合约创建 pool 后, 得到的 pool address',
  })
  address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', description: '创建 pool 的钱包地址' })
  creator: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    type: 'number',
    description: '创建 pool 的时间锁, 格式为 unix 时间戳(秒)',
  })
  lockDuration: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    description:
      '给 pool 注入资金的钱包地址(一般为多签), 同时也是拥有 refund 权限的钱包地址',
  })
  depositor: string;

  @ArrayNotEmpty()
  @IsArray()
  @ApiProperty({ isArray: true, description: '给批量钱包分配 token 集合' })
  tokens: PoolTokenBody[];
}

export class PoolTokenBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'token 合约地址,如果分配 token 是原生代币, 地址为address(0)',
  })
  token: string;

  @ArrayNotEmpty()
  @IsArray()
  @ApiProperty({ isArray: true, description: '分配的钱包地址列表' })
  wallets: string[];

  @ArrayNotEmpty()
  @IsArray()
  @ApiProperty({
    isArray: true,
    description: '给每个钱包分配的 token 数量,精度为 token 的 decimal',
  })
  amounts: string[];

  @ArrayNotEmpty()
  @IsArray()
  @ApiProperty({
    isArray: true,
    description: '给每个钱包分配 token 的百分比, 同 allocation,精度为8位',
  })
  ratios: number[];
}

// export class PoolTokenClaimStatusBody extends PoolTokenBody {
//   @IsNotEmpty()
//   @IsString()
//   @ApiProperty({ type: 'string', description: '' })
//   token: string;
//
//   @IsNumber()
//   @Type(() => Number)
//   @ApiProperty({ type: 'number', description: '' })
//   ratio: number;
//
//   @IsNotEmpty()
//   @IsString()
//   @ApiProperty({ type: 'string', description: '' })
//   amount: string;
//
//   @IsNotEmpty()
//   @IsString()
//   @ApiProperty({ type: 'string', description: '' })
//   status: string;
// }
//
// export class PoolClaimStatusResponse {
//   @IsNotEmpty()
//   @IsString()
//   @ApiProperty({ type: 'string' })
//   poolId: string;
//
//   @ApiProperty({
//     type: 'object',
//     additionalProperties: {
//       type: 'array',
//       items: { type: 'string' },
//     },
//   })
//   tokens: PoolTokenClaimStatusBody[];
// }

export class ClaimBody extends AuthBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'project id(同时也是 project address)',
  })
  projectId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', description: '激励池 id' })
  poolId: string;
}

export class SyncUnClaimBody {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: 'number', description: '当前公链 id' })
  chainId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', description: '激励池 id' })
  poolId: string;
}
