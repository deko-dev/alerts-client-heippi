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
        window.navigator.vibrate(3000);

      }
    )
  }

  ngOnInit(): void {
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
