import { EventEmitter, Injectable, Output, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class RegisterCodeService extends Socket {

  @Output() alertOut: EventEmitter<any> = new EventEmitter;

  public readonly PUBLIC_VAPID_KEY = 'BGi3yISPyUrS-F7r8k3umdtVZBJ5Ega3hV-APpz2A6muxS0z51wIo1t3r9dh2ZYgw8LDRI-E9yU4v11_Mxkmr-Y';

  pushSubscription: any = {};


  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private swPush: SwPush
  ) { 
    super({
      url: environment.serverSocket
    });

    this.ioSocket.on('alert', (res: any) => {
      this.alertOut.emit(res);
    });
    // this.subscribedSW();
  }

  registerCode(payload: {}) {
    console.log('Registrando Codigo');
    console.log(payload);
    this.ioSocket.emit('default', {
        event: "register-code",
        ...payload
    });
  }


  async subscribedSW() {
    console.log('SubscribedSW');
    const subs = await this.swPush.requestSubscription({ serverPublicKey: this.PUBLIC_VAPID_KEY })
    console.log(subs);
  }

  addPushSubscriber(sub:any) {
    return this.http.post('/api/notifications', sub);
}

  private urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

}
