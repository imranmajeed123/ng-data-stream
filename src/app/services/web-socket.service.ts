import { Injectable } from '@angular/core';
import { Observable, of, retry, switchMap } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable()
export class WebSocketService {
  connection$!: WebSocketSubject<any>;
  RETRY_SECONDS = 10;

  connect(): Observable<any> {
    return of('wss://ws-feed-public.sandbox.exchange.coinbase.com').pipe(
      switchMap((wsUrl) => {
        if (this.connection$) {
          return this.connection$;
        } else {
          this.connection$ = webSocket(wsUrl);
          return this.connection$;
        }
      }),
      retry({ count: 4, delay: this.RETRY_SECONDS })
    );
  }

  subscribe(channel = 'BTC-USD') {
    const msg = {
      type: 'subscribe',
      product_ids: [channel],
      channels: [
        {
          name: 'level2',
        },
      ],
    };

    if (this.connection$) {
      const payload = {
        token: '',
        ...msg,
      };
      this.connection$.next(payload);
    }
  }
  unsubscribe(channel = 'BTC-USD') {
    const msg = {
      type: 'unsubscribe',
      channels: ['heartbeat', 'level2'],
    };

    if (this.connection$) {
      const payload = {
        token: '',
        ...msg,
      };
      this.connection$.next(payload);
    }
  }
  closeConnection() {
    if (this.connection$) {
      this.connection$.complete();
      this.connection$.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.closeConnection();
  }
}
