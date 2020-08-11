import React, { FC, useMemo } from 'react';
import { Statistic } from '@acala-dapp/ui-components';
import { useRequest } from '@acala-dapp/react-hooks';

import classes from './DashboardDetail.module.scss';
import { TinyAreaChart } from 'bizcharts';
import { get } from 'lodash';

const DashboardDetail: FC = () => {
  const aUSDIssuedData = useRequest(() => ({
    method: 'GET',
    url:
      'http://39.99.168.67:8086/query?q=SELECT MAX("amount") FROM "acala"."autogen"."issuance" WHERE time > now() - 30d AND time < now() AND asset = \'AUSD\' GROUP BY time(1d)'
  }));

  const newAccountData = useRequest(() => ({
    method: 'GET',
    url:
      'http://39.99.168.67:8086/query?q=SELECT SUM("count") FROM "acala"."autogen"."new-account" WHERE time > now() - 30d AND time < now() GROUP BY time(1d)'
  }));

  const [todayAUSD, aUSDIssuedHistory] = useMemo(() => {
    if (!aUSDIssuedData.data || !aUSDIssuedData.data.results) return [];
    const temp = get(aUSDIssuedData, 'data.results.0.series.0.values') as any[];
    const today = get(temp, [temp.length - 1, 1]) || 0;
    const yesterday = get(temp, [temp.length - 2, 1]) || 0;

    return [today - yesterday, temp];
  }, [aUSDIssuedData]);

  const [todayNewAccounnt, newAccountHistory] = useMemo(() => {
    if (!newAccountData.data || !newAccountData.data.results) return [];
    const temp = get(newAccountData, 'data.results.0.series.0.values') as any[];
    const today = get(temp, [temp.length - 1, 1]) || 0;

    return [today, temp];
  }, [newAccountData]);

  return (
    <div className={classes.root}>
      <div className={classes.item}>
        <Statistic
          title='aUSD Issued'
          value={
            <div className={classes.value}>
              <div>{todayAUSD}</div>
              {aUSDIssuedHistory ? (
                <TinyAreaChart
                  color='#FF7788'
                  data={aUSDIssuedHistory.map((item) => ({ date: item[0], value: item[1] }))}
                  height={60}
                  width={124}
                  xField='date'
                  yField='value'
                />
              ) : null}
            </div>
          }
        />
      </div>
      <div className={classes.item}>
        <Statistic title='Dex Daily Volume' value={'111111'} />
      </div>
      <div className={classes.item}>
        <Statistic title='DOT Staked' value={'111111'} />
      </div>
      <div className={classes.item}>
        <Statistic
          title='New Accounts'
          value={
            <div className={classes.value}>
              <div>{todayNewAccounnt}</div>
              {newAccountHistory ? (
                <TinyAreaChart
                  color='#FF7788'
                  data={newAccountHistory.map((item) => ({ date: item[0], value: item[1] }))}
                  height={60}
                  width={124}
                  xField='date'
                  yField='value'
                />
              ) : null}
            </div>
          }
        />
      </div>
      <div className={classes.item}>
        <Statistic title='Daily Trascation' value={'111111'} />
      </div>
      <div className={classes.item}>
        <Statistic title='Total Asset Locked' value={'111111'} />
      </div>
    </div>
  );
};

export default DashboardDetail;
