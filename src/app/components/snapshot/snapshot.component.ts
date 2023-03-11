import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-snapshot',
  templateUrl: './snapshot.component.html',
  styleUrls: ['./snapshot.component.scss']
})
export class SnapshotComponent implements OnInit, OnDestroy {
 
  destroyed$ = new Subject();
  snapshot = [] as any;
  bids: Array<any> = [];
  asks: Array<any> = [];

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.getSnapshotsObs().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(message => {
      this.bids = message.bids;
      this.asks = message.asks;
    });    
  }
  ngOnDestroy(): void {
    this.destroyed$.complete();
    this.destroyed$.unsubscribe();
  }

}
