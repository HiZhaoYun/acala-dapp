import { Token, FormatBalance } from '@acala-dapp/react-components';
import { useConstants, useRequestChart } from '@acala-dapp/react-hooks';
import { Card } from '@acala-dapp/ui-components';
import { Table } from 'antd';
import React, { FC, useMemo } from 'react';

const AssetOverview: FC = () => {
  const _data = useRequestChart(
    `SELECT mean("collateralValue") AS "locked", mean("liquidationRatio") AS "liquidationRatio", mean("collateralRatio") AS "collateralsRatio" FROM "acala"."autogen"."cdp" WHERE time < now() GROUP BY time(1d), "asset" FILL(null) ORDER BY time DESC LIMIT 2`
  );

  const list = useMemo(() => {
    return _data?.map((obj: any) => {
      return {
        currency: obj?.tags.asset,
        ...obj?.values
          .filter((item: any) => item[1])?.[0]
          .reduce((r: any, c: any, i: any) => {
            r[obj.columns[i]] = c;
            return r;
          }, {})
      };
    });
  }, [_data]);

  const columns = useMemo(() => {
    return [
      {
        key: 'currency',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => {
          return <Token currency={item.currency} fullname={true} icon={true} />;
        },
        title: 'Currency'
      },
      {
        key: 'locked',
        /* eslint-disable-next-line react/display-name */
        render: (item: any) => item.locked.toFixed(0),
        title: 'Locked'
      },
      {
        key: 'supply',
        /* eslint-disable-next-line react/display-name */
        render: (item: any) => null,
        title: 'Supply (aUSD)'
      },
      {
        key: 'collateralsRatio',
        /* eslint-disable-next-line react/display-name */
        render: (item: any) => `${(item.collateralsRatio * 100).toFixed(2)}%`,
        title: 'Collaterals Ratio %'
      },
      {
        key: 'liquidationRatio',
        /* eslint-disable-next-line react/display-name */
        render: (item: any) => `${(item.liquidationRatio * 100).toFixed(2)}%`,
        title: 'Liquidation Ratio %'
      }
    ];
  }, []);

  return (
    <Card header='Assets Overview' padding={false}>
      <Table columns={columns} rowKey='currency' dataSource={list} pagination={false} />
    </Card>
  );
};

export default AssetOverview;
