import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  destroyed$ = new Subject();
  darkMode = false;

  constructor(
    private webSocket: WebSocketService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.webSocket
      .connect()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((message) => {
        console.log('message', Object.keys(message));

        if (message.type === 'snapshot') {
          this.dataService.sendSnapshot(message);
        } else if (message.type === 'l2update') {
          this.dataService.sendUpdate(message);
        }
      });
  }

  sendMessage() {
    this.webSocket.send({});
  }
  switchTheme() {
    this.darkMode = !this.darkMode;
    if (this.darkMode === true) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
    this.destroyed$.unsubscribe();
  }
}
