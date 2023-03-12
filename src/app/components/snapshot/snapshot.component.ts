import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SnapshotItem } from 'src/app/model/app.model';
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
  bids: Array<SnapshotItem> = [];
  asks: Array<SnapshotItem> = [];

  constructor(private store: Store<CoinBaseState>) {}

  ngOnInit(): void {
    this.store
      .select(snapshotSelector)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((snapshot: {asks: Array<SnapshotItem>, bids: Array<SnapshotItem>}) => {
        this.asks = snapshot.asks;
        this.bids = snapshot.bids;
      });
  }
  ngOnDestroy(): void {
    this.destroyed$.complete();
    this.destroyed$.unsubscribe();
  }
}
