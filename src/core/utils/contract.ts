import { VoteApproveEnum, VoteSystemEnum } from '@core/type/doc/project';
import * as fs from 'fs';
import * as path from 'path';

const VoteStrategyABIMap = {
  RelativeV1: fs.readFileSync(
    path.resolve(__dirname, '../../abi/vote_strategy_relative_v1_abi.json'),
    'utf-8',
  ),
  RelativeV2: fs.readFileSync(
    path.resolve(__dirname, '../../abi/vote_strategy_relative_v2_abi.json'),
    'utf-8',
  ),
  AbsoluteV1: fs.readFileSync(
    path.resolve(__dirname, '../../abi/vote_strategy_absolute_v1_abi.json'),
    'utf-8',
  ),
  AbsoluteV2: fs.readFileSync(
    path.resolve(__dirname, '../../abi/vote_strategy_absolute_v2_abi.json'),
    'utf-8',
  ),
};

export const IntcentivePoolABI = fs.readFileSync(
  path.resolve(__dirname, '../../abi/incentive_pool_abi.json'),
  'utf-8',
);

const VoteStrategyMap = {
  420: {
    RelativeV1: '0xCdff95c4a99c1A645D6Be65c01be027cFE8cDC26',
    RelativeV2: '0xD52A7eF9E7736506988c3B9b1a7Ffde451a236f7',
    AbsoluteV1: '0xE0289920f9aB0d1303e6c53CE3A124509fbe55e1',
    AbsoluteV2: '0xF919c9C0345f381de69EAA89ED20791Aca00CFcE',
  },
  10: {
    RelativeV1: '0x6fCa841788F8EAd49b2a94516F275FaA5Ae08d16',
    RelativeV2: '0xBD13f4962C1a379DA6476Bd8d0d494c04c2E88C8',
    AbsoluteV1: '0xE0289920f9aB0d1303e6c53CE3A124509fbe55e1',
    AbsoluteV2: '0xF919c9C0345f381de69EAA89ED20791Aca00CFcE',
  },
  11155420: {
    RelativeV1: '0x7c0a966f373a3935D51fa29a239FC54e1d981aA6',
    RelativeV2: '0x4911fC85BfED269f7A37214028CF428C637Bc196',
    AbsoluteV1: '0x9843cdD2F79723596df556068759cDA510602b92',
    AbsoluteV2: '0xe5ffAF764995fD864651bb71f4bb1d6ffe17665F',
  },
};

export function getVoteStrategyABI(voteApproveType: VoteApproveEnum) {
  const { RelativeV1, RelativeV2, AbsoluteV2, AbsoluteV1 } = VoteStrategyABIMap;
  switch (voteApproveType) {
    case VoteApproveEnum.ABSOLUTE1:
      return AbsoluteV1;
    case VoteApproveEnum.ABSOLUTE2:
      return AbsoluteV2;
    case VoteApproveEnum.RELATIVE2:
      return RelativeV2;
    default:
      return RelativeV1;
  }
}

export function getVoteStrategyContract(
  voteApproveType: VoteApproveEnum,
  chainId: number,
): string {
  const { RelativeV1, RelativeV2, AbsoluteV2, AbsoluteV1 } =
    VoteStrategyMap[chainId];
  switch (voteApproveType) {
    case VoteApproveEnum.ABSOLUTE1:
      return AbsoluteV1;
    case VoteApproveEnum.ABSOLUTE2:
      return AbsoluteV2;
    case VoteApproveEnum.RELATIVE2:
      return RelativeV2;
    default:
      return RelativeV1;
  }
}

export function getVoteThreshold(
  voteApproveType: VoteApproveEnum,
  forWeightOfTotal: number | string,
  differWeightOfTotal: number | string,
) {
  let voteThreshold = 50;
  if (voteApproveType === VoteApproveEnum.ABSOLUTE1) {
    voteThreshold = Number(forWeightOfTotal);
  } else if (voteApproveType === VoteApproveEnum.ABSOLUTE2) {
    voteThreshold = Number(differWeightOfTotal);
  }
  return voteThreshold;
}

export function getVoteWeights(
  voteSystem: VoteSystemEnum,
  voteWeights: number[],
  memberNum: number,
) {
  if (voteSystem === VoteSystemEnum.EQUAL) {
    const weight = Math.floor(100 / memberNum);
    return Array(memberNum).fill(weight);
  } else {
    return voteWeights;
  }
}
