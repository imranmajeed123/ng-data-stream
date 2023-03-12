import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CoinBaseState } from 'src/app/reducers';
import { snapshotSelector } from 'src/app/reducers/coinbase.selectors';
// import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-snapshot',
  templateUrl: './snapshot.component.html',
  styleUrls: ['./snapshot.component.scss']
})
export class SnapshotComponent implements OnInit, OnDestroy {
 
  destroyed$ = new Subject();
  snapshot = [] as any;
  bids: Array<any> = [] ;
  asks: Array<any> = [];

  constructor(
    // private dataService: DataService, 
    private store: Store<CoinBaseState>
  ) {}

  ngOnInit(): void {
    // this.dataService.getSnapshotsObs().pipe(
    //   takeUntil(this.destroyed$)
    // ).subscribe(message => {
    //   this.bids = message.bids;
    //   this.asks = message.asks;
    // });    
    this.store.select(snapshotSelector).pipe(
      takeUntil(this.destroyed$)).subscribe( (snapshot: any) => {
      this.asks = snapshot.asks;
      this.bids = snapshot.bids;
    });
  }
  ngOnDestroy(): void {
    this.destroyed$.complete();
    this.destroyed$.unsubscribe();
  }

}
