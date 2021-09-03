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

  name: string= '';
  code: string = '';

  isAlert: boolean = false;
  textAlert: string = '';

  pushSubscription: any = {};

  isPermission: boolean = false;

  isLoading: boolean = false;

  public dataInCookie: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private registerCodeService: RegisterCodeService,
    private cookieService: CookieService,
    private swPush: SwPush
  ) {
    if(Notification.permission === 'default'){
      this.subscribePushNotification();
    } else {
      this.isPermission = true;
      console.log('Status REGISTER-CODE LINE40', Notification.permission);
      this.swPush.subscription.subscribe(
        (response) => {
          console.log(response);
          this.pushSubscription = response;
        }
      )
    }
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

  ngOnInit() {    
    if(this.cookieService.get('device')){
      const device = JSON.parse(this.cookieService.get('device'));
      if(this.code !== device.code){
        device.code = this.code;
      }

      const dataSend = {
        ...device,
        pushSubscription: this.pushSubscription
      }


      this.registerCodeService.registerCode( device );
      this.dataInCookie = true;
    }
  }


  register(){
    this.registerCodeService.registerCode(
      {
        code: this.code,
        pushSubscription: this.pushSubscription
      }
    );
    this.cookieService.set('device',JSON.stringify( 
      {
        code: this.code
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

}
