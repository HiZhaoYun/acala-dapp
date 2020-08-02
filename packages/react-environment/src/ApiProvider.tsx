import React, { ReactNode, FC, useState, useEffect } from 'react';
import { ApiRx } from '@polkadot/api'; import { timeout, switchMap } from 'rxjs/operators';

import { options } from '@acala-network/api';

import { selectFastestEndpoints, DEFAULT_ENDPOINTS } from './utils/endpoints';

const MAX_CONNECT_TIME = 1000 * 60; // one minute

interface ConnectStatus {
  connected: boolean;
  error: boolean;
  loading: boolean;
}

export interface ApiContextData {
  api: ApiRx;
  connected: boolean;
  error: boolean;
  loading: boolean;
  chain: string;
}

// ensure that api always exist
export const ApiContext = React.createContext<ApiContextData>({} as ApiContextData);

interface Props {
  endpoint?: string;
  children: ReactNode;
  Loading?: ReactNode;
}

/**
 * @name ApiProvider
 * @description connect chain in the Api Higher-Order Component.
 */
export const ApiProvider: FC<Props> = ({
  Loading,
  children,
  endpoint
}) => {
  const [connectStatus, setConnectStatus] = useState<ConnectStatus>(
    {} as ConnectStatus
  );
  const [api, setApi] = useState<ApiRx>({} as ApiRx);
  const [chain, setChain] = useState<string>('');

  const renderContent = (): ReactNode => {
    if (connectStatus.loading) {
      return Loading || null;
    }

    if (JSON.stringify(api) !== '{}') {
      return children;
    }
  };

  useEffect(() => {
    if (api.isConnected) return;

    let _endpoints = DEFAULT_ENDPOINTS;

    if (endpoint) {
      _endpoints = [{
        name: '',
        url: endpoint
      }];
    }

    // reset connect status
    setConnectStatus({ connected: false, error: false, loading: true });

    selectFastestEndpoints(_endpoints).pipe(
      switchMap((provider) => {
        return ApiRx.create(options({ provider }));
      }),
      timeout(MAX_CONNECT_TIME)
    ).subscribe({
      error: (): void => {
        setConnectStatus({ connected: false, error: true, loading: false });
      },
      next: (result): void => {
        setApi(result);
        setConnectStatus({ connected: true, error: false, loading: false });
      }
    });

    return (): void => Reflect.has(api, 'disconnect') ? api.disconnect() : undefined;
  }, [api, endpoint]);

  useEffect(() => {
    if (!connectStatus.connected) return;

    api.rpc.system.chain().subscribe((result) => {
      setChain(result.toString());
    }).unsubscribe();
  }, [api, connectStatus]);

  useEffect(() => {
    if (!connectStatus.connected) return;

    api.on('disconnected', () => {
      setConnectStatus({ connected: false, error: true, loading: false });
    });
    api.on('error', () => {
      setConnectStatus({ connected: false, error: true, loading: false });
    });
    api.on('connected', () => {
      setConnectStatus({ connected: true, error: false, loading: false });
    });

    return (): void => api.disconnect();
  }, [api, connectStatus]);

  return (
    <ApiContext.Provider
      value={{
        api,
        chain,
        ...connectStatus
      }}
    >
      {renderContent()}
    </ApiContext.Provider>
  );
};
