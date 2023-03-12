import { createSelector } from "@ngrx/store";



export const snapshotSelector = createSelector(
    (state: any) => state["coinBase"],
    (coinBase) => coinBase.snapshot
);

export const updateSelectors = createSelector(
    (state: any) => state["coinBase"],
    (coinBase) => coinBase.update
);

