import { createReducer } from 'typesafe-actions';
import { ChainState } from '../types';
import * as actions from './actions';

const initialState: ChainState = {
    app: null,
    connected: false,
    pricesFeed: [],
    vaults: [],
};

export default createReducer(initialState)
    .handleAction(actions.connectAsync.success, (state, action) => ({
        ...state,
        app: action.payload,
        connected: true,
    }))
    .handleAction(actions.fetchPricesFeed.success, (state, action) => ({
        ...state,
        pricesFeed: action.payload,
    }))
    .handleAction(actions.fetchVaults.success, (state, action) => ({
        ...state,
        vaults: action.payload,
    }));
