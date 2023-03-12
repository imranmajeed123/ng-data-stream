import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { CoinBaseState } from 'src/app/store';
import { coinBaseActions } from 'src/app/store/actions.types';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  destroyed$ = new Subject();
  lightMode = false;
  allowSubscription = true;

  constructor(
    private webSocket: WebSocketService,
    private store: Store<CoinBaseState>
  ) {}

  ngOnInit() {
    this.webSocket
      .connect()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((message) => {
        this.handleMessages(message);
      });
  }

  private handleMessages(message: any) {
    if (message.type === 'snapshot') {
      this.store.dispatch(
        coinBaseActions.snapshotLoaded({ snapshot: message })
      );
    } else if (message.type === 'l2update') {
      message['changes'].forEach((item: any) => {
        item.push(message.time);
      });
      this.store.dispatch(
        coinBaseActions.updatesAdded({ update: message })
      );
    }
  }

  sendMessage() {
    if (this.allowSubscription === true) {
      this.webSocket.subscribe();
    } else {
      this.webSocket.unsubscribe();
    }
    this.allowSubscription = !this.allowSubscription;
  }

  switchTheme() {
    this.lightMode = !this.lightMode;
    if (this.lightMode === true) {
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
