import { Statistic } from '@acala-dapp/ui-components';
import React, { FC } from 'react';
import { Fixed18 } from '@acala-network/app-util';
import classes from './DashboardDetail.module.scss';
import { useDashboard } from '@acala-dapp/react-hooks';
import { TinyAreaChart, Chart, Area, Line, Tooltip, Axis, Coordinate } from 'bizcharts';

interface StatisticContentProps {
  value?: string;
  history?: {
    date: number;
    value: number;
  }[];
  scale?: any;
  areaColor: string;
  lineColor: string;
}

const StatisticContent: FC<StatisticContentProps> = ({ areaColor, lineColor, scale, value, history }) => {
  return (
    <div className={classes.statisticContent}>
      <div>{value || '--'}</div>
      <div>
        <TinyAreaChart
          scale
          color={lineColor}
          data={history || []}
          height={60}
          width={124}
          xField='date'
          yField='value'
        />
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
          value={
            <StatisticContent
              lineColor='#ff7788'
              areaColor='#fbe4e9'
              value={data.aUSDIssued.value}
              history={data.aUSDIssued.history}
            />
          }
        />
      </div>
      <div className={classes.item}>
        <Statistic
          className={classes.statistic}
          title='Dex Daily Volume'
          value={
            <StatisticContent
              lineColor='#c39fdf'
              areaColor='#f3ecf9'
              value={data.dexDailyVolume.value}
              history={data.dexDailyVolume.history}
            />
          }
        />
      </div>
      <div className={classes.item}>
        <Statistic
          className={classes.statistic}
          title='DOT Staked'
          value={
            <StatisticContent
              lineColor='#4be1b5'
              areaColor='#f3ecf9'
              value={data.DOTStaked.value}
              history={data.DOTStaked.history}
            />
          }
        />
      </div>
      <div className={classes.item}>
        <Statistic
          className={classes.statistic}
          title='New Accounts'
          value={
            <StatisticContent
              lineColor='#ff7788'
              areaColor='#fbe4e9'
              value={data.newAccounts.value}
              history={data.newAccounts.history}
            />
          }
        />
      </div>
      <div className={classes.item}>
        <Statistic
          className={classes.statistic}
          title='Daily Trascation'
          value={
            <StatisticContent
              lineColor='#c39fdf'
              areaColor='#f3ecf9'
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
              lineColor='#4be1b5'
              areaColor='#dff9f1'
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
