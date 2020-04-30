import React, { FC, useContext } from 'react';
import { CurrencyId } from '@acala-network/types/interfaces';

import { Card, Table, TableItem } from '@honzon-platform/ui-components';
import { StakingPoolContext, Token, UserBalance  } from '@honzon-platform/react-components';

interface TableData {
  token: CurrencyId;
}

export const StakingTokeBalances: FC = () => {
    const { stakingPool } = useContext(StakingPoolContext);

    const tableConfig: TableItem<TableData>[] = [
      {
        align: 'left',
        title: 'token',
        dataIndex: 'token',
        render: (data: CurrencyId) => {
          return <Token token={data} />
        }
      },
      {
        title: 'balance',
        align: 'right',
        render: (data: TableData) => <UserBalance token={data.token} />
      }
    ];
    const tableData = [
      { token: stakingPool.stakingCurrency },
      { token: stakingPool.liquidCurrency }
    ];

    if (!stakingPool) {
      return null;
    }

    return (
      <Card header='Balance' gutter={false}>
        <Table config={tableConfig} data={tableData} />
      </Card>
    );
}