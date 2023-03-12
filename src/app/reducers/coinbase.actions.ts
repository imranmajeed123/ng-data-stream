import { createAction, props } from "@ngrx/store";

export const loadAllData = createAction(
    "[CoinBase Start] Load snapshot and updates"
);

export const snapshotLoaded = createAction(
    "[coin-base snapshot] snapshot Loaded", props<{snapshot: any}>()
);

export const updatesAdded = createAction(
    "[coin-base update] updates Added", props<{update: any}>()
);
