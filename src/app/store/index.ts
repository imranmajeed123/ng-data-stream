import { createReducer, on } from "@ngrx/store"
import { SnapshotItem, UpdateItem } from "../model/app.model";
import { coinBaseActions } from "./actions.-types";
export interface CoinBaseState {
    snapshot: { bids: Array<SnapshotItem>, asks: Array<SnapshotItem>},
    update: {changes: Array<UpdateItem>}
}

const changesItem: Array<UpdateItem> = [];
const bidsItem: Array<SnapshotItem> = [];
const asks: Array<SnapshotItem> = [];
export const initialState = { snapshot: {bids: bidsItem, asks: asks}, update: {changes: changesItem}};

export const coinBaseReducer = createReducer (

    initialState,
    on(coinBaseActions.snapshotLoaded, (state, action) => {     
        const bids: Array<SnapshotItem> = [];
        const asks: Array<SnapshotItem> = [];
        action.snapshot['bids'].forEach((bid: any) => {
            const item: SnapshotItem = {px: bid[0], qty: bid[1]};
            bids.push(item);
        });
        action.snapshot['asks'].forEach((ask: any) => {
            const item: SnapshotItem = {px: ask[0], qty: ask[1]};
            asks.push(item);
        });
        return {...state, snapshot: {bids, asks}};
    }),
    on(coinBaseActions.updatesAdded,  (state, action) => { 
        const items: Array<UpdateItem> = [] ;
        action.update['changes'].forEach((change: any) => {
            const item: UpdateItem = {type: change[0], px: change[1], qty: change[2], time: change[3]};
            items.push(item);
        });
        const changes: Array<UpdateItem> = [...state.update.changes, ...items]; 

        return {...state, update: {changes}};
    })
);