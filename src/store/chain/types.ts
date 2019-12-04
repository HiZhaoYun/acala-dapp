import { PromiseResult } from '@polkadot/api/types';

export interface ChainState {
    app: PromiseResult<any> | null; // polkadot api entity
    version: string; // acala chain version
}
