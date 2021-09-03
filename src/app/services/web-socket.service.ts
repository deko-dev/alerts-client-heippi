import { Injectable, Output, EventEmitter } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService extends Socket {

  @Output() outEvent: EventEmitter<any> = new EventEmitter();
  @Output() devicesOut: EventEmitter<any> = new EventEmitter();

  
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

    this.ioSocket.on('response', (res: any) => {
      console.log('Send Devices');
      this.devicesOut.emit(res);
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

  alert() {
    console.log('Emitiendo');
    
    this.ioSocket.emit('default', {
        event: 'alert',
        payload: 'OK2Ws6QFnqW7UstgAAAC'
        // payload: 'jybIuakSX-Dz6kjjAAAF'
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
  getSockets() {
    console.log('sockets')
    this.ioSocket.emit('default', {
      event: 'devices',
    });
  }

  sendAlert( device: any) {
    this.ioSocket.emit('default', {
      event: 'alert',
      payload: {
        id: device.id,
        pushSubscription: device.pushSubscription
      }
    });
  }

} 
