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

  nameRestaurant: string = '';

  constructor(
    private cookieService: CookieService
  ) {
    super({
      url: environment.serverSocket,
      options: {
        query: {
          payload: localStorage.getItem('restaurant')
        }
      }
    });

    
    

    this.ioSocket.on('devices:restaurant', (res: any) => {
      this.devicesOut.emit(res);
    });
    this.getSockets();
  }


  login(event: string, payload = {}) {
    console.log('Emitiendo');
    
    this.ioSocket.emit('default', {
        cookiePayload: localStorage.getItem('restaurant'),
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
      cookiePayload: localStorage.getItem('restaurant'),
      event: 'message',
      payload
    });
  }

  getMessages() {
    this.ioSocket.emit('default', {
      cookiePayload: localStorage.getItem('restaurant'),
      event: 'messages',
    });
  }
  getSockets() {
    const dataLS: any = localStorage.getItem('restaurant');
    const restaurant = JSON.parse(dataLS);
    restaurant.name = restaurant.name.replaceAll(' ', '_').toLowerCase()
    this.ioSocket.emit('devices:restaurant', {
      ...restaurant
    });
  }

  sendAlert( device: any) {
    this.ioSocket.emit('default', {
      event: 'alert',
      ...device
    });
  }

} 
