import { Token } from '@acala-dapp/react-components';
import { useConstants } from '@acala-dapp/react-hooks';
import { Card } from '@acala-dapp/ui-components';
import { Table } from 'antd';
import React, { FC, useMemo } from 'react';

const AssetOverview: FC = () => {
  const { loanCurrencies } = useConstants();

  const columns = useMemo(() => {
    return [
      {
        key: 'currency',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => <Token currency={item.currency} fullname={true} icon={true} />,
        title: 'Currency'
      },
      {
        key: 'locked',
        /* eslint-disable-next-line react/display-name */
        render: (item: any) => null,
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
        render: (item: any) => null,
        title: 'Collaterals Ratio %'
      },
      {
        key: 'liquidationRatio',
        /* eslint-disable-next-line react/display-name */
        render: (item: any) => null,
        title: 'Liquidation Ratio %'
      }
    ];
  }, []);

  const data = useMemo(
    () =>
      loanCurrencies.map((item) => ({
        currency: item
      })),
    [loanCurrencies]
  );

  return (
    <Card header='Assets Overview' padding={false}>
      <Table columns={columns} rowKey={(id) => id.currency.toString()} dataSource={data} pagination={false} />
    </Card>
  );
};

export default AssetOverview;
