import { Statistic } from '@acala-dapp/ui-components';
import { Token } from '@acala-dapp/react-components';
import React, { FC } from 'react';
import { useIssuance, useConstants, useTotalDebit, useTotalCollatearl } from '@acala-dapp/react-hooks';

import classes from './Overview.module.scss';

const DashboardDetail: FC = () => {
  const { stableCurrency } = useConstants();
  const audIssue = useIssuance(stableCurrency);
  const totalDebit = useTotalDebit();
  const totalCollateral = useTotalCollatearl();

  return (
    <div className={classes.root}>
      <div className={classes.item}>
        <Statistic
          title={<Token currency={stableCurrency} fullname={true} icon={true} />}
          value={audIssue ? audIssue.toString(0) : '--'}
        />
      </div>
      <div className={classes.item}>
        <Statistic title='Total Loans' value={totalDebit?.amount ? totalDebit.amount.toString(0) : '--'} />
      </div>
      <div className={classes.item}>
        <Statistic
          title='Total Collateral'
          value={totalCollateral?.amount ? totalCollateral.amount.toString(0) : '--'}
        />
      </div>
    </div>
  );
};

export default DashboardDetail;
