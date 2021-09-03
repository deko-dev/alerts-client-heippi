import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-main-users',
  templateUrl: './main-users.component.html',
  styleUrls: ['./main-users.component.scss']
})
export class MainUsersComponent implements OnInit {

  isLoading: boolean = false;
  UUID: string = '';
  listDevices: any[] = [];

  textAlert: string = '';

  constructor(
    protected webSocketService: WebSocketService,
    private cookieService: CookieService,
  ) { 
    this.webSocketService.devicesOut.subscribe(
      (res) => {
        console.log(res);
        this.listDevices = res;
      }
    )
  }

  ngOnInit(): void {
    this.webSocketService.getSockets();
  }

  public generarUUID(){
    return Math.random().toString().substr(3, 4);
  }

  public newDevie(){ 
    this.isLoading = true;
    setTimeout(() => {
      this.UUID = this.generarUUID();
    }, 2000);
  }

  public alert(device: any){
    this.webSocketService.sendAlert(device);
    this.textAlert = `Alerta Enviada al Dispositivo con Id: ${device.id}`;
  }

}
