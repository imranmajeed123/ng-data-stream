import { createReducer, on } from "@ngrx/store"
import { coinBaseActions } from "./actions.-types";
export interface CoinBaseState {
    snapshot: { bids: Array<any>, asks: Array<any>},
    update: {changes: Array<any>}
}

export const initialState = { snapshot: {bids: [], asks: []}, update: {changes: []}};

export const coinBaseReducer = createReducer (

    initialState,
    on(coinBaseActions.snapshotLoaded, (state, action) => {     
        const bids = [...action.snapshot['bids']] as any;
        const asks = [...action.snapshot['asks']] as any;
        return {...state, snapshot: {bids, asks}};
    }),
    on(coinBaseActions.updatesAdded,  (state, action) => { 
        const changes = [...state.update.changes, ...action.update['changes']] as any; 
        return {...state, update: {changes}};
    })
);