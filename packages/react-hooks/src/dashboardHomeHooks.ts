import { Fixed18 } from '@acala-network/app-util';
import useRequest from '@umijs/use-request';
import { get } from 'lodash';
import { useMemo } from 'react';

import { useConstants, useIssuance, useStakingPoolHelper } from './index';

type HooksReturnType = Record<
  string,
  {
    value?: string;
    history?: {
      date: number;
      value: number;
    }[];
  }
>;

const useHistory = (sql: string) => {
  const data = useRequest(() => ({
    method: 'GET',
    url: `http://39.99.168.67:8086/query?q=${sql}`
  }));

  const history = useMemo(() => {
    if (!data.data || !data.data.results) return [];
    const temp = get(data, 'data.results.0.series.0.values') as any[];
    return temp
      ?.filter((item) => item[1])
      ?.slice(-7)
      .map((item, index) => ({ date: index + 1, value: item[1] }));
  }, [data]);

  return history;
};

export const useDashboard = (): HooksReturnType => {
  const { stableCurrency } = useConstants();
  const audIssue = useIssuance(stableCurrency);
  const helper = useStakingPoolHelper();

  const DOTStakedHistory = useHistory(
    'SELECT mean("amount") FROM "acala"."autogen"."dot-staked" WHERE time > now() - 8d AND time < now() GROUP BY time(1d)'
  );

  const aUSDIssuedHistory = useHistory(
    `SELECT MAX("amount") FROM "acala"."autogen"."issuance" WHERE time > now() - 8d AND time < now() AND asset = \'AUSD\' GROUP BY time(1d)`
  );
  const newAccountHistory = useHistory(
    `SELECT SUM("count") FROM "acala"."autogen"."new-account" WHERE time > now() - 8d AND time < now() GROUP BY time(1d)`
  );

  return useMemo(() => {
    return {
      aUSDIssued: {
        value: audIssue?.toString(0),
        history: aUSDIssuedHistory
      },
      dexDailyVolume: {
        history: []
      },
      DOTStaked: {
        value: helper?.communalTotal?.toString(0),
        history: DOTStakedHistory
      },
      newAccounts: {
        value: newAccountHistory?.[newAccountHistory.length - 1]?.value,
        history: newAccountHistory
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
