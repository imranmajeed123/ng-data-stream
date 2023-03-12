import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CoinBaseState } from 'src/app/store';
import { snapshotSelector } from 'src/app/store/coinbase.selectors';

@Component({
  selector: 'app-snapshot',
  templateUrl: './snapshot.component.html',
  styleUrls: ['./snapshot.component.scss'],
})
export class SnapshotComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  snapshot = [] as any;
  bids: Array<any> = [];
  asks: Array<any> = [];

  constructor(private store: Store<CoinBaseState>) {}

  ngOnInit(): void {
    this.store
      .select(snapshotSelector)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((snapshot: any) => {
        this.asks = snapshot.asks;
        this.bids = snapshot.bids;
      });
  }
  ngOnDestroy(): void {
    this.destroyed$.complete();
    this.destroyed$.unsubscribe();
  }
}
