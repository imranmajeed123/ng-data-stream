import { Injectable } from "@angular/core";
import { delay, filter, map, Observable, of, retryWhen, switchMap } from "rxjs";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import AES from 'crypto-js/aes';

@Injectable()
export class WebSocketService {
    connection$!: WebSocketSubject<any>;
    RETRY_SECONDS = 10;
    

    connect(): Observable<any> {
        return of('wss://ws-feed-public.sandbox.exchange.coinbase.com').pipe(
          filter(apiUrl => !!apiUrl),
          // https becomes wws, http becomes ws
          map(apiUrl => apiUrl.replace(/^http/, 'ws') + '/stream'),
          switchMap(wsUrl => {
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

      const CB_ACCESS_KEY = 'T9W7pu334Geq1bbg';
      const SECRET = 'DYLsLK5mhjrDzVqAUCjoDJ0bc010L7jP';
      const CB_ACCESS_TIMESTAMP = Math.floor(Date.now() / 1000); 
      const combineString = "#heartbeat#T9W7pu334Geq1bbg#DYLsLK5mhjrDzVqAUCjoDJ0bc010L7jP#{CB_ACCESS_TIMESTAMP}#PORTFOLIO_ID";
      const cb_access_sign = AES.encrypt(JSON.stringify(combineString), SECRET).toString();
      const msg = {
        "type": "subscribe",     
        "access_key": CB_ACCESS_KEY,
        "api_key_id": SECRET,
        "timestamp": CB_ACCESS_TIMESTAMP,
        "signature": cb_access_sign,
        "product_ids": [
          "BTC-USD"
      ],
      "channels": [  
        {
          "name": "level2"
      }
    ]
    }
 
        if (this.connection$) {
          const payload = {
            token: '19b84205e35060e9941ad2151520a9bbf1c9a526cd3f263d872106434f7b522f',
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