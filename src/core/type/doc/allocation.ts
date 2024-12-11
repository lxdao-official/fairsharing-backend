import { AuthBody } from '@core/type/doc/auth';
import { PaginateQuery } from '@core/type/doc/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class AllocationListQuery extends PaginateQuery {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'project id(同时也是 project address)',
  })
  projectId: string;

  // @IsOptional()
  // @Type(() => Number)
  // @ApiProperty({ type: 'number' })
  // dateFrom?: number;
  //
  // @IsOptional()
  // @Type(() => Number)
  // @ApiProperty({ type: 'number' })
  // dateTo?: number;
}

export class UpdateAllocationStatusBody extends AuthBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    description:
      'allocation 状态,有3个,分别是 INITIAL:初始,ATTESTED:经 EAS 创建成功, REVOKED: EAS 记录撤销(暂时用不到)',
  })
  status: 'INITIAL' | 'ATTESTED' | 'REVOKED';

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', description: '经 EAS 创建成功后返回的 uid' })
  uId: string;
}

export class CreateAllocationBody extends AuthBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', description: 'allocation 标题' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'project id(同时也是 project address)',
  })
  projectId: string;

  @ArrayNotEmpty()
  @IsArray()
  @ApiProperty({ isArray: true, description: '贡献者钱包地址列表' })
  contributors: string[];

  @ArrayNotEmpty()
  @IsArray()
  @ApiProperty({
    isArray: true,
    description: '贡献者分配 token 百分比列表,,精度为8位',
  })
  ratios: number[];

  @ArrayNotEmpty()
  @IsArray()
  @ApiProperty({
    isArray: true,
    description: '贡献者 claim 成功的 token 数量,精度以 token decimal为准',
  })
  credits: string[];
}
