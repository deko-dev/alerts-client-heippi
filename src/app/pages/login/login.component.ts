import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm!: FormGroup;

  user:any;

  constructor(
    protected webSocketService: WebSocketService,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private router: Router
  ){
    
    this.webSocketService.outEvent.subscribe(
      (res) => {
        console.log(res);
      }
    )

  }

  ngOnInit(){

    this.initForm();

    if(this.cookieService.get('user')){
      this.router.navigateByUrl('chat');
    }
  }

  public initForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      nickname: ['', Validators.required]
    })
  }


  mockedUser = (userValue: any) => {
    this.cookieService.set('user',JSON.stringify( userValue ))
  }

  sendUser = (event: any, dataUser: {}) =>{
    this.webSocketService.login( event, { ...dataUser });
    this.router.navigateByUrl('chat');
  }

  public onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    console.log(this.userForm.getRawValue());

    this.mockedUser( this.userForm.getRawValue() );
    this.sendUser( 'login', this.userForm.getRawValue());
  }

}
