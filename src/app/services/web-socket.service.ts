import { Injectable, Output, EventEmitter } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService extends Socket {

  @Output() outEvent: EventEmitter<any> = new EventEmitter();

  
  constructor(
    private cookieService: CookieService
  ) {

    super({
      url: environment.serverSocket,
      options: {
        query: {
          payload: cookieService.get('user')
        }
      }
    });

    console.log('Send');
    this.ioSocket.on('message', (res: any) => {
      console.log(res);
      this.outEvent.emit(res);
    });
    this.ioSocket.on('messages', (res: any) => {
      this.outEvent.emit(res);
    });
  }


  public hacerLogin (event: string,payload = {}) {
    console.log('Emitiendo');
    
    this.ioSocket.emit('default', {
        cookiePayload:this.cookieService.get('user'),
        event,
        payload
    });
  }

  login(event: string, payload = {}) {
    console.log('Emitiendo');
    
    this.ioSocket.emit('default', {
        cookiePayload:this.cookieService.get('user'),
        event,
        payload
    });
  }

  sendMessage( payload: {}) {
    this.ioSocket.emit('default', {
      cookiePayload:this.cookieService.get('user'),
      event: 'message',
      payload
    });
  }

  getMessages() {
    this.ioSocket.emit('default', {
      cookiePayload:this.cookieService.get('user'),
      event: 'messages',
    });
  }

} 
