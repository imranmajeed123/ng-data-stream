import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-show-msg',
  templateUrl: './show-msg.component.html',
  styleUrls: ['./show-msg.component.scss']
})
export class ShowMsgComponent {
  messages: any[] = [];
msgCtrl = '';
destroyed$ = new Subject();
constructor(private webSocket: WebSocketService) {}
ngOnInit() {
  this.webSocket.connect().pipe(
    takeUntil(this.destroyed$)
  ).subscribe(message => {
    if(message.last_trade_id){
      this.messages.push(message.last_trade_id)
      console.log('message', message.last_trade_id);
    }
    
  });
}
sendMessage() {
  this.webSocket.send({ message: this.msgCtrl});
  this.msgCtrl='';
}
ngOnDestroy() {
  this.destroyed$.complete();
  this.destroyed$.unsubscribe();
}

}
