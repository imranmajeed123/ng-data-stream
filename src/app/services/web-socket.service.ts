import { Injectable } from '@angular/core';
import { delay, filter, map, Observable, of, retryWhen, switchMap } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable()
export class WebSocketService {
  connection$!: WebSocketSubject<any>;
  RETRY_SECONDS = 10;

  connect(): Observable<any> {
    return of('wss://ws-feed-public.sandbox.exchange.coinbase.com').pipe(
      filter((apiUrl) => !!apiUrl),
      // https becomes wws, http becomes ws
      map((apiUrl) => apiUrl.replace(/^http/, 'ws') + '/stream'),
      switchMap((wsUrl) => {
        if (this.connection$) {
          return this.connection$;
        } else {
          this.connection$ = webSocket(wsUrl);
          return this.connection$;
        }
      }),
      retryWhen((errors) => errors.pipe(delay(this.RETRY_SECONDS)))
    );
  }

  send(data: any) {
    const msg = {
      type: 'subscribe',
      product_ids: ['BTC-USD'],
      channels: [
        {
          name: 'level2',
        },
      ],
    };

    if (this.connection$) {
      const payload = {
        token:
          '19b84205e35060e9941ad2151520a9bbf1c9a526cd3f263d872106434f7b522f',
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
