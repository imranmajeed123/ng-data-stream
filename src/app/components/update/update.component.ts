import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit, OnDestroy {
  
  @ViewChild('updateTable')
  updateTable!: Table;
  loading = false;
  changes: Array<any> = [];
  destroyed$ = new Subject();
  constructor(
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.getUpdatesObs().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(message => {
       if (this.changes.length > 0) {
        message.changes.forEach((element: any) => {
          this.loading = true;
          this.changes.push(element);
          setTimeout(() => {
            this.updateTable.scrollTo( { top: 600 });
            this.loading = false;
          }, 1000);
        });       
       } else {
        this.changes = message.changes;
       }      
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
    this.destroyed$.unsubscribe();
  }

}
