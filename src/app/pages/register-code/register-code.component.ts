import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../../services/web-socket.service';
import { RegisterCodeService } from './register-code.service';
import { CookieService } from 'ngx-cookie-service';

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

  public dataInCookie: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private registerCodeService: RegisterCodeService,
    private cookieService: CookieService
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

  ngOnInit(): void {
    if(localStorage.getItem('device')){
      const device: any = localStorage.getItem('device');
      if(JSON.parse(device).code === this.code){
        this.code = JSON.parse(device).code;
      } else {
        JSON.parse(device).code = this.code;
      }
      this.registerCodeService.registerCode( JSON.parse(device) );
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
    localStorage.setItem('device', JSON.stringify( 
      {
        name: this.name,
        code: this.code
      }
    ))
    this.dataInCookie = true;
  }

}
