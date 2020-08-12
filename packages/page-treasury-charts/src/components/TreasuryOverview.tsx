import { getTokenName } from '@acala-dapp/react-components';
import { useTreasuryOverview } from '@acala-dapp/react-hooks';
import { Statistic } from '@acala-dapp/ui-components';
import { TinyAreaChart } from 'bizcharts';
import React, { FC } from 'react';
import classes from './TreasuryOverview.module.scss';

interface StatisticContentProps {
  value?: string;
  history?: {
    date: number;
    value: number;
  }[];
  scale?: any;
  color: string;
}

const StatisticContent: FC<StatisticContentProps> = ({ color, value, history }) => {
  return (
    <div className={classes.statisticContent}>
      <div>{value || '--'}</div>
      <div>
        <TinyAreaChart color={color} data={history || []} height={60} width={124} xField='date' yField='value' />
      </div>
    </div>
  );
};

export const TreasuryOverview: FC = () => {
  const overview = useTreasuryOverview();

  if (!overview) return null;

  return (
    <div className={classes.root}>
      <div className={classes.item}>
        <Statistic title='Surplus Pool' value={overview.surplusPool.toNumber(2, 2)} />
      </div>
      <div className={classes.item}>
        <Statistic title='Debit Pool' value={overview.debitPool.toNumber(2, 2)} />
      </div>
      {overview?.totalCollaterals?.map((item, index) => {
        const color = ['#ff7788', '#c39fdf', '#4be1b5'][(index + 2) % 3];

        return (
          <div className={classes.item} key={`collateral-${item.currency}`}>
            <Statistic
              title={`Current Collateral(${getTokenName(item.currency)})`}
              value={
                <StatisticContent color={color} value={item.value || '--'} history={(item.history as any) || []} />
              }
            />
          </div>
        );
      })}
    </div>
  );
};
