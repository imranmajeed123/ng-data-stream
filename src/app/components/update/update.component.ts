import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit, OnDestroy {
  
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
          this.changes.push(element);
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
