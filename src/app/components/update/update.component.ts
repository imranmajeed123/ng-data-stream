import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { CoinBaseState } from 'src/app/store';
import { updateSelectors } from 'src/app/store/coinbase.selectors';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit, OnDestroy {
  @ViewChild('updateTable')
  updateTable!: Table;
  loading = false;
  changes: Array<any> = [];
  destroyed$ = new Subject();
  scrollTo = 300;
  constructor(private store: Store<CoinBaseState>) {}

  ngOnInit(): void {
    this.store
      .select(updateSelectors)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((update: any) => {
        if (this.changes.length > 0) {
          this.loading = true;
          this.changes = update.changes;
          setTimeout(() => {
            this.scrollTo = this.scrollTo + 300;
            this.updateTable.scrollTo({ top: this.scrollTo });
            this.loading = false;
          }, 1000);
        } else {
          this.changes = update.changes;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
    this.destroyed$.unsubscribe();
  }
}
