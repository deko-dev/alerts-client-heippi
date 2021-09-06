import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private _snackBar: MatSnackBar
  ) { 
    this.webSocketService.devicesOut.subscribe(
      (res) => {
        if(res.length > this.devices.length){
          this._snackBar.open('Nuevo Dispositivo Vinculado!!', 'Cerrar' ,{
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 3000
          });
        }
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
    this._snackBar.open(this.generarUUID(5), 'Cerrar' ,{
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 3000
    });
  }

  public alert(device: any){
    this.webSocketService.sendAlert(device);
  }


}
