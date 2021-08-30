import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public message: string = '';

  public messages: any[] = []

  public userCurrent: any = {};

  constructor(
    protected webSocketService: WebSocketService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.webSocketService.outEvent.subscribe(
      (res) => {
        this.messages = res;
      }
    )
  }

  ngOnInit(): void {
    if(this.cookieService.get('user')){
      this.userCurrent = JSON.parse(this.cookieService.get('user'));
      this.webSocketService.getMessages();
    } else {
      this.router.navigateByUrl('login');
    }
  }


  sendMessage(){
    const date = new Date;
    const message = {
      date: `${date.getHours()} - ${date.getMinutes()}`,
      message: this.message,
      user: this.userCurrent.nickname
    }

    this.webSocketService.sendMessage(message);
    this.message = '';

  }

}
