import { WsProvider } from '@polkadot/api';
import { race, from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface EndpointConfig {
  name: string;
  url: string;
}

export const DEFAULT_ENDPOINTS: EndpointConfig[] = [
  // {
  //   name: 'Mandala TC4 Node 1 (Hosted by OnFinality)',
  //   // url: 'wss://node-6661046769230852096.jm.onfinality.io/ws'
  //   url: 'wss://node-6684611762228215808.jm.onfinality.io/ws'
  // },
  // {
  //   name: 'Mandala TC4 Node 2 (Hosted by OnFinality)',
  //   url: 'wss://node-6684611760525328384.rz.onfinality.io/ws'
  // },
  {
    name: 'Mandala TC4 Node 3 (Hosted by Acala)',
    url: 'wss://testnet-node-1.acala.laminar.one/ws'
  }
];

export const selectFastestEndpoints = (endpoints: EndpointConfig[]): Observable<WsProvider> => {
  const _collective: WsProvider[] = [];

  return race(endpoints.map((config) => {
    const wsProvider = new WsProvider(config.url, false);

    _collective.push(wsProvider);

    return from(wsProvider.connect().then(() => wsProvider));
  })).pipe(
    tap((provider) => {
      // disconnect other provider
      _collective.forEach((item) => item !== provider ? item.disconnect() : undefined);
    })
  );
};
