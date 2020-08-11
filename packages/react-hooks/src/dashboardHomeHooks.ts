import { Fixed18 } from '@acala-network/app-util';
import { useMemo } from 'react';

import { useIssuance, useConstants, useStakingPoolHelper } from './index';

type HooksReturnType = Record<
  string,
  {
    value?: Fixed18;
    history: {
      date: number;
      value: number;
    }[];
  }
>;

export const useDashboard = (): HooksReturnType => {
  const { stableCurrency } = useConstants();
  const audIssue = useIssuance(stableCurrency);
  const helper = useStakingPoolHelper();

  return useMemo(() => {
    return {
      aUSDIssued: {
        value: audIssue,
        history: []
      },
      dexDailyVolume: {
        history: []
      },
      DOTStaked: {
        value: helper?.communalTotal,
        history: []
      },
      newAccounts: {
        history: []
      },
      dailyTrascation: {
        history: []
      },
      totalAssetLocked: {
        history: []
      }
    };
  }, [audIssue, helper]);
};
