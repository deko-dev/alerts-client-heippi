import { Component, Input, OnInit } from '@angular/core';
import { WebSocketService } from '../../../services/web-socket.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  devices: any[] = [];

  constructor(
    protected webSocketService: WebSocketService,
  ) { 
    this.webSocketService.devicesOut.subscribe(
      (res) => {
        this.devices = res;
      }
    )
    this.getDevices();
  }

  ngOnInit(): void {    
  }

  getDevices(){
  }
  
  
  public generarUUID(sizeUUID: number){
    return Math.random().toString().substr(3, sizeUUID);
  }

  public newDevie(){ 
    // this.isLoading = true;
    setTimeout(() => {
      // this.UUID = this.generarUUID(5);
    }, 2000);
  }

  public alert(device: any){
    this.webSocketService.sendAlert(device);
  }


}
