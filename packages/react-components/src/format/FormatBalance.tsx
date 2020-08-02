import React, { FC, ReactNode } from 'react';

import { Balance as BalanceType } from '@polkadot/types/interfaces';
import { Fixed18 } from '@acala-network/app-util';

import { CurrencyId } from '@acala-network/types/interfaces';
import { BareProps } from '@acala-dapp/ui-components/types';

import { formatBalance, getTokenName } from '../utils';
import { FormatNumber, FormatNumberProps } from './FormatNumber';

export interface BalancePair {
  balance?: BalanceType | Fixed18 | number;
  currency?: CurrencyId | string;
}

export interface FormatBalanceProps extends BareProps {
  balance?: BalanceType | Fixed18 | number;
  currency?: CurrencyId | string;
  pair?: BalancePair[];
  pairSymbol?: string;
  decimalLength?: number;
}

const formatBalanceConfig: FormatNumberProps['formatNumberConfig'] = {
  decimalLength: 6,
  removeEmptyDecimalParts: true,
  removeTailZero: true
};

export const FormatBalance: FC<FormatBalanceProps> = ({
  balance,
  className,
  currency,
  decimalLength = 6,
  pair,
  pairSymbol
}) => {
  const pairLength = pair ? pair.length : 0;

  const renderBalance = (data: BalancePair, index: number): ReactNode => {
    const _balance = formatBalance(data?.balance);

    return [
      <span key={'format-balance-' + index}>
        <FormatNumber
          data={_balance}
          formatNumberConfig={{ ...formatBalanceConfig, decimalLength }}
        />
        {data.currency ? <span>{' '}{getTokenName(data.currency)}</span> : null}
      </span>,
      (pairSymbol && index !== pairLength - 1) ? <span key={'format-balance-symbol-' + index}>{' '}{pairSymbol}{' '}</span> : null
    ];
  };

  return (
    <span className={className}>
      {pair ? pair.map((data, index) => renderBalance(data, index)) : renderBalance({ balance, currency }, -1)}
    </span>
  );
};
