import { useConstants } from '@acala-dapp/react-hooks';
import { Grid, Page, Tabs } from '@acala-dapp/ui-components';
import React, { FC } from 'react';
import Oracles from './components/Oracles';
import PriceChart from './components/PriceChart';

const PageDashboardHome: FC = () => {
  const { loanCurrencies } = useConstants();

  return (
    <Page fullscreen>
      <Page.Title title='Oracles' />
      <Page.Content>
        <Grid container>
          <Grid item>
            <Oracles />
          </Grid>
          <Grid item>
            <Page.Title title='Price Feeds' />
            <Tabs type='button'>
              {loanCurrencies?.map((item: any) => {
                return (
                  <Tabs.Panel key={item.toString()} tab={item.toString()}>
                    <PriceChart currency={item.toString()} />
                  </Tabs.Panel>
                );
              })}
            </Tabs>
          </Grid>
        </Grid>
      </Page.Content>
    </Page>
  );
};

export default PageDashboardHome;
