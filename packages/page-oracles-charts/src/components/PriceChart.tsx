import { useRequestChart } from '@acala-dapp/react-hooks';
import { Card } from '@acala-dapp/ui-components';
import { Chart, Line, Point, Tooltip } from 'bizcharts';
import React, { FC, useMemo } from 'react';

const PriceChart: FC<{ currency: string }> = ({ currency }) => {
  const _data = useRequestChart(
    `SELECT mean("price")  FROM "acala"."autogen"."price" WHERE time > now() - 30d AND time < now() AND ("asset"='${currency.toUpperCase()}') GROUP BY time(4h), "asset" FILL(previous)`
  );

  const data = useMemo(() => {
    return _data?.[0].values.map((item: any) => {
      return {
        x: item[0].split('T')[0],
        date: item[0],
        value: item[1]
      };
    });
  }, [_data]);

  return (
    <Card>
      <Chart padding={[40, 40, 40, 40]} autoFit height={500} data={data}>
        <Line position='x*value' />
        <Tooltip title="date" showCrosshairs />
      </Chart>
    </Card>
  );
};

export default PriceChart;
