import { Page, Grid } from '@acala-dapp/ui-components';
import React, { FC } from 'react';
import Liquidations from './components/Liquidations';

import CollateralAuctionList from './components/CollateralAuctionList';

const PageDashboardHome: FC = () => {
  return (
    <Page fullscreen>
      <Page.Title breadcrumb='Liquidations' title='Stablecoin' />
      <Page.Content>
        <Grid container>
          <Grid item>
            <Liquidations />
          </Grid>
          <Grid item>
            <CollateralAuctionList />
          </Grid>
        </Grid>
      </Page.Content>
    </Page>
  );
};

export default PageDashboardHome;
