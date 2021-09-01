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

    try {
      const response = await this.swPush.requestSubscription({ serverPublicKey: this.VAPID_PUBLIC_KEY })
      console.log(response);
    } catch (error) {
      throw new Error(error);
      
    }
    





    if(this.cookieService.get('device')){
      this.registerCodeService.registerCode( JSON.parse(this.cookieService.get('device')) );
      this.code = JSON.parse(this.cookieService.get('device')).code;
      this.dataInCookie = true;
    }
  }


  register(){
    this.registerCodeService.registerCode(
      {
        name: this.name,
        code: this.code
      }
    );
    this.cookieService.set('device',JSON.stringify( 
      {
        name: this.name,
        code: this.code
      }
    ))
    this.dataInCookie = true;
  }

}
