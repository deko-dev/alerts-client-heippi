import { EventEmitter, Injectable, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RegisterCodeService extends Socket {

  @Output() alertOut: EventEmitter<any> = new EventEmitter;

  constructor(
    private cookieService: CookieService
  ) { 
    super({
      url: environment.serverSocket
    });

    this.ioSocket.on('alert', (res: any) => {
      this.alertOut.emit(res);
    });
  }


  registerCode(payload: {}) {
    console.log('Registrando Codigo');
    
    this.ioSocket.emit('default', {
        event: "register-code",
        payload
    });
  }

}
