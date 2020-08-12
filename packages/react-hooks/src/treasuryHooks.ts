import { useState, useEffect, useMemo } from 'react';

import { Fixed18, convertToFixed18 } from '@acala-network/app-util';
import { Balance } from '@acala-network/types/interfaces';

import { useCall } from './useCall';
import { CurrencyLike, WithNull } from './types';
import { useApi } from './useApi';
import { combineLatest } from 'rxjs';
import { useConstants } from './useConstants';
import { useRequestChart } from './';

interface TreasuryOverview {
  debitPool: Fixed18;
  surplusPool: Fixed18;
  totalCollaterals: {
    currency: string;
    value: string;
    history: {
      date: number;
      value: number;
    }[];
  }[];
}

export const useTreasuryOverview = (): WithNull<TreasuryOverview> => {
  const { api } = useApi();
  const { loanCurrencies } = useConstants();
  const _debitPool = useCall<Balance>('query.cdpTreasury.debitPool');
  const _surplusPool = useCall<Balance>('query.cdpTreasury.surplusPool');
  const [result, setResult] = useState<WithNull<TreasuryOverview>>(null);

  const _collateralValue = useRequestChart(
    `SELECT mean("collateralValue")  FROM "acala"."autogen"."cdp" WHERE time > now() - 8d AND time < now() GROUP BY time(1d), "asset" FILL(null)`
  );

  const collateralValue = useMemo(() => {
    return _collateralValue?.map((obj: any) => {
      const history = obj.values
        .filter((item: any) => item[1])
        .map((item: any, index: any) => {
          return {
            date: index,
            value: item[1]
          };
        });
      return {
        currency: obj?.tags.asset,
        value: history[history.length - 1].value.toFixed(0),
        history: history.slice(-7)
      };
    });
  }, [_collateralValue]);

  useEffect(() => {
    const subscriber = combineLatest(
      loanCurrencies.map((currency) => api.query.cdpTreasury.totalCollaterals<Balance>(currency))
    ).subscribe((result) => {
      setResult({
        debitPool: convertToFixed18(_debitPool || 0),
        surplusPool: convertToFixed18(_surplusPool || 0),
        totalCollaterals: collateralValue
      });
    });

    return (): void => subscriber.unsubscribe();
  }, [_debitPool, _surplusPool, setResult, api.query.cdpTreasury, loanCurrencies]);

  return result;
};
