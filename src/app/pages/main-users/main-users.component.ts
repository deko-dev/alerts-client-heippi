import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { CookieService } from 'ngx-cookie-service';
import { SwPush } from '@angular/service-worker';

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

  public readonly VAPID_PUBLIC_KEY = 'BLpWrYjfdkphUVTEOlTjKg3InCo99o2-5cvLqiPZ83I6H0Djac-gvXW6AkKrQzXTxp0MEnZUa4GijosGoiKQYJc'

  constructor(
    protected webSocketService: WebSocketService,
    private cookieService: CookieService,
    private swPush: SwPush
  ) { 
    this.webSocketService.devicesOut.subscribe(
      (res) => {
        console.log(res);
        this.listDevices = res;
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


    this.webSocketService.getSockets();
  }

  public generarUUID(){
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  public newDevie(){ 
    this.isLoading = true;
    setTimeout(() => {
      this.UUID = this.generarUUID();
    }, 2000);
  }

  public alert(deviceId: string){
    this.webSocketService.sendAlert(deviceId);
    console.log(deviceId);
    this.textAlert = `Alerta Enviada al Dispositivo con Id: ${deviceId}`;
  }

}
