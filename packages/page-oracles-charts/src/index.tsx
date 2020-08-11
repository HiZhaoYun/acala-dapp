import { Page, Grid } from '@acala-dapp/ui-components';
import React, { FC } from 'react';

import Oracles from './components/Oracles';

const PageDashboardHome: FC = () => {
  return (
    <Page fullscreen>
      <Page.Title title='Oracles' />
      <Page.Content>
        <Grid container>
          <Grid item>
            <Oracles />
          </Grid>
        </Grid>
      </Page.Content>
    </Page>
  );
};

export default PageDashboardHome;
