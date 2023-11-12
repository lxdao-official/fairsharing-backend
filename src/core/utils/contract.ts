import vote_strategy_absolute_v1_abi from '@/src/abi/vote_strategy_absolute_v1_abi.json';
import vote_strategy_absolute_v2_abi from '@/src/abi/vote_strategy_absolute_v2_abi.json';
import vote_strategy_relative_v1_abi from '@/src/abi/vote_strategy_relative_v1_abi.json';
import vote_strategy_relative_v2_abi from '@/src/abi/vote_strategy_relative_v2_abi.json';
import { VoteApproveEnum, VoteSystemEnum } from '@core/type/doc/project';

const VoteStrategyABIMap = {
  RelativeV1: vote_strategy_relative_v1_abi,
  RelativeV2: vote_strategy_relative_v2_abi,
  AbsoluteV1: vote_strategy_absolute_v1_abi,
  AbsoluteV2: vote_strategy_absolute_v2_abi,
};

const VoteStrategyMap = {
  RelativeV1: '0xCdff95c4a99c1A645D6Be65c01be027cFE8cDC26',
  RelativeV2: '0xD52A7eF9E7736506988c3B9b1a7Ffde451a236f7',
  AbsoluteV1: '0xE0289920f9aB0d1303e6c53CE3A124509fbe55e1',
  AbsoluteV2: '0xF919c9C0345f381de69EAA89ED20791Aca00CFcE',
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
): string {
  const { RelativeV1, RelativeV2, AbsoluteV2, AbsoluteV1 } = VoteStrategyMap;
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
