import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../../services/web-socket.service';
import { RegisterCodeService } from './register-code.service';
import { CookieService } from 'ngx-cookie-service';
import { SwPush } from '@angular/service-worker';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-register-code',
  templateUrl: './register-code.component.html',
  styleUrls: ['./register-code.component.scss']
})
export class RegisterCodeComponent implements OnInit {
  codeDevice: string = '';

  isAlert: boolean = false;

  pushSubscription: any = {};

  isPermission: boolean = false;

  restaurantName: string | null = '';

  public dataInCookie: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private registerCodeService: RegisterCodeService,
    private cookieService: CookieService,
    private swPush: SwPush
  ) {
    this.restaurantName = this.activatedRoute.snapshot.queryParamMap.get('restaurant');
    if(Notification.permission === 'default'){
      this.subscribePushNotification();
    } else {
      this.isPermission = true;
      this.swPush.subscription.subscribe(
        (response) => {
          this.pushSubscription = response;
        }
      )
    }
    this.registerCodeService.alertOut.subscribe(
      (res) => {
        console.log(res);
        if(!res.id_client){
          window.navigator.vibrate(99999999999999);
          this.isAlert = true;
        }
      }
    )
  }

  ngOnInit() {    
    if(this.cookieService.get('device')){
      const device = JSON.parse(this.cookieService.get('device'));
      this.codeDevice = device.code;
      this.registerCodeService.registerCode( device );
      this.dataInCookie = true;
    }
  }


  register(){
    this.registerCodeService.registerCode(
      {
        restaurantName: this.restaurantName, 
        code: this.codeDevice,
        pushSubscription: this.pushSubscription
      }
    );
    this.cookieService.set('device',JSON.stringify( 
      {
        restaurantName: this.restaurantName, 
        code: this.codeDevice,
        pushSubscription: this.pushSubscription
      }
    ))
    this.dataInCookie = true;
  }

  subscribePushNotification() {
    this.swPush.requestSubscription({ serverPublicKey: environment.vapidPublicKey })
      .then(
        (response) => {
          this.pushSubscription = response;
          this.isPermission = true;
        }
      ).catch( console.log );
  }

  request(){
  }

  stopVibrate(){
    window.navigator.vibrate(0);
    this.cookieService.delete('device');
    this.dataInCookie = false;
    this.codeDevice = '';
  }

}
