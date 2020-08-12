import { useDashboard } from '@acala-dapp/react-hooks';
import { Statistic } from '@acala-dapp/ui-components';
import { TinyAreaChart } from 'bizcharts';
import React, { FC } from 'react';
import classes from './DashboardDetail.module.scss';

interface StatisticContentProps {
  value?: string;
  history?: {
    date: number;
    value: number;
  }[];
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

const DashboardDetail: FC = () => {
  const data = useDashboard();

  return (
    <div className={classes.root}>
      <div className={classes.item}>
        <Statistic
          className={classes.statistic}
          title='aUSD Issued'
          value={<StatisticContent color='#ff7788' value={data.aUSDIssued.value} history={data.aUSDIssued.history} />}
        />
      </div>
      <div className={classes.item}>
        <Statistic
          className={classes.statistic}
          title='Dex Daily Volume'
          value={
            <StatisticContent color='#c39fdf' value={data.dexDailyVolume.value} history={data.dexDailyVolume.history} />
          }
        />
      </div>
      <div className={classes.item}>
        <Statistic
          className={classes.statistic}
          title='DOT Staked'
          value={<StatisticContent color='#4be1b5' value={data.DOTStaked.value} history={data.DOTStaked.history} />}
        />
      </div>
      <div className={classes.item}>
        <Statistic
          className={classes.statistic}
          title='New Accounts'
          value={<StatisticContent color='#ff7788' value={data.newAccounts.value} history={data.newAccounts.history} />}
        />
      </div>
      <div className={classes.item}>
        <Statistic
          className={classes.statistic}
          title='Daily Trascation'
          value={
            <StatisticContent
              color='#c39fdf'
              value={data.dailyTrascation.value}
              history={data.dailyTrascation.history}
            />
          }
        />
      </div>
      <div className={classes.item}>
        <Statistic
          className={classes.statistic}
          title='Total Asset Locked'
          value={
            <StatisticContent
              color='#4be1b5'
              value={data.totalAssetLocked.value}
              history={data.totalAssetLocked.history}
            />
          }
        />
      </div>
    </div>
  );
};

export default DashboardDetail;
