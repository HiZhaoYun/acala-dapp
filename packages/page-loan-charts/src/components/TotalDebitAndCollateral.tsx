import React, { FC, useMemo } from 'react';

import { Card, Grid } from '@acala-dapp/ui-components';
import { Chart, Interval, Tooltip, Axis, Coordinate, Interaction } from 'bizcharts';
import { Fixed18 } from '@acala-network/app-util';

import { useTotalDebit, useTotalCollatearl, TotalDebitOrCollateralData } from '@acala-dapp/react-hooks';
import { getTokenColor, getTokenName, FormatValue } from '@acala-dapp/react-components';

import classes from './TotalDebitAndCollateral.module.scss';

interface ChartData {
  item: string;
  count: number;
  percent: number;
}

interface OverviewDataDisplayProps {
  title: string;
  data: TotalDebitOrCollateralData | null;
}

const OverviewDataDisplay: FC<OverviewDataDisplayProps> = ({ data, title }) => {
  const chartData: ChartData[] = useMemo(() => {
    if (!data) return [];

    let _total = Fixed18.ZERO;
    const result: ChartData[] = [];

    data.amountDetail.forEach((data): void => {
      _total = _total.add(data);
    });

    data.amountDetail.forEach((data, currency): void => {
      result.push({
        count: data.toNumber(2, 3),
        item: getTokenName(currency),
        percent: data.div(_total).toNumber(2, 3)
      });
    });

    return result;
  }, [data]);

  const cols = useMemo(() => {
    return {
      precent: {
        formatter: (val: number): string => (val * 100).toFixed(2) + '%'
      }
    };
  }, []);

  if (!data) return null;

  return (
    <Grid
      item
      span={12}
    >
      <Card
        extra={<FormatValue data={data.amount} />}
        header={title}
      >
        <div className={classes.chart}>
          <Chart
            animate={false}
            autoFit
            data={chartData}
            height={400}
            scale={cols}
          >
            <Coordinate
              radius={0.75}
              type='theta'
            />
            <Axis visible={false} />
            <Interval
              adjust='stack'
              color={['item', (item: string): string => getTokenColor(item)]}
              label={['count', {
                content: (data: any): string => {
                  return `${data.item}: ${(data.percent * 100).toFixed(2)}%`;
                }
              }]}
              position='percent'
              style={{
                lineWidth: 1,
                stroke: '#fff'
              }}
              tooltip={['item*count', (item, count) => ({
                name: item,
                value: '$ ' + count
              })]}
            />
            <Interaction type='element-single-selected' />
          </Chart>
        </div>
      </Card>
    </Grid>
  );
};

const TotalDebit: FC = () => {
  const debitDetails = useTotalDebit();

  return (
    <OverviewDataDisplay
      data={debitDetails}
      title='Total Debits'
    />
  );
};

const TotalCollateral: FC = () => {
  const collateralDetails = useTotalCollatearl();

  return (
    <OverviewDataDisplay
      data={collateralDetails}
      title='Total Collaterals'
    />
  );
};

export const TotalDebitAndCollateral: FC = () => {
  return (
    <Grid container >
      <TotalCollateral />
      <TotalDebit />
    </Grid>
  );
};
