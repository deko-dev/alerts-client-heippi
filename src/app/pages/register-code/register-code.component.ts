import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../../services/web-socket.service';
import { RegisterCodeService } from './register-code.service';
import { CookieService } from 'ngx-cookie-service';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-register-code',
  templateUrl: './register-code.component.html',
  styleUrls: ['./register-code.component.scss']
})
export class RegisterCodeComponent implements OnInit {

  name: string= '';
  code: string = '';

  isAlert: boolean = false;
  textAlert: string = '';

  pushSubscription: any = {};

  isPermission: boolean = false;


  public readonly VAPID_PUBLIC_KEY = 'BLpWrYjfdkphUVTEOlTjKg3InCo99o2-5cvLqiPZ83I6H0Djac-gvXW6AkKrQzXTxp0MEnZUa4GijosGoiKQYJc'

  public dataInCookie: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private registerCodeService: RegisterCodeService,
    private cookieService: CookieService,
    private swPush: SwPush
  ) {
    this.code = this.activatedRoute.snapshot.params.code; 
    this.registerCodeService.alertOut.subscribe(
      (res) => {
        console.log(res);
        if(!res.id_client){
          window.navigator.vibrate(3000);
          this.isAlert = true;
          this.textAlert = 'Notificado!!!'
        }
      }
    )
  }

  async ngOnInit() {
    this.subscribePushNotification;
    
    if(this.cookieService.get('device')){
      const device = JSON.parse(this.cookieService.get('device'));
      if(this.code !== device.code){
        device.code = this.code;
      }

      const dataSend = {
        ...device,
        ...this.pushSubscription
      }


      this.registerCodeService.registerCode( device );
      this.dataInCookie = true;
    }
  }


  register(){
    this.registerCodeService.registerCode(
      {
        code: this.code,
        ...this.pushSubscription
      }
    );
    this.cookieService.set('device',JSON.stringify( 
      {
        code: this.code
      }
    ))
    this.dataInCookie = true;
  }

  async subscribePushNotification() {
    try {
      this.pushSubscription = await this.swPush.requestSubscription({ serverPublicKey: this.VAPID_PUBLIC_KEY })
      this.isPermission = true;
      console.log(this.pushSubscription);
    } catch (error) {
      console.log(error);
    }
  }

}
