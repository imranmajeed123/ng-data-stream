import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit, OnDestroy {
  
  upated = {} as any;
  destroyed$ = new Subject();
  constructor(
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.getUpdatesObs().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(message => {
       if (this.upated.changes) {
        this.upated.changes.push(message.changes);
       } else {
        this.upated = message;
       }      
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
    this.destroyed$.unsubscribe();
  }

}
