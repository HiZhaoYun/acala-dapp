import { getTokenColor } from '@acala-dapp/react-components';
import { useRequestChart } from '@acala-dapp/react-hooks';
import { Card } from '@acala-dapp/ui-components';
import { Fixed18 } from '@acala-network/app-util';
import { Chart, Interval, Tooltip } from 'bizcharts';
import React, { FC, useMemo } from 'react';

export const LoanLiquidationRatio: FC = () => {
  const data = useRequestChart(
    `SELECT  mean("liquidationRatio") FROM  "acala"."autogen"."cdp" WHERE time < now() GROUP BY time(1d), "asset" ORDER BY time DESC LIMIT 2`
  );

  const _data = useMemo(() => {
    return (
      data?.map((obj: any) => {
        return {
          currency: obj?.tags?.asset,
          ratio: Number(obj?.values?.[1]?.[1]?.toFixed(2))
        };
      }) || []
    );
  }, [data]);

  return useMemo(() => {
    return (
      <Card header='Liquidation Ratio'>
        <Chart
          animation={false}
          autoFit
          data={_data}
          height={400}
          interactions={['active-region']}
          padding={[30, 30, 60, 30]}
        >
          <Interval
            color={['currency', (item: string): string => getTokenColor(item)]}
            label={[
              'ratio',
              {
                content: (data: any): string => {
                  return `${data.ratio}%`;
                }
              }
            ]}
            position='currency*ratio'
          />
          <Tooltip shared />
        </Chart>
      </Card>
    );
  }, [_data]);
};
