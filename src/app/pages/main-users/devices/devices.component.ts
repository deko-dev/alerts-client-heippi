import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebSocketService } from '../../../services/web-socket.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  devices: any[] = [];
  restaurantData: any = {};
  codeNewOrder: string = '';

  constructor(
    protected webSocketService: WebSocketService,
    private _snackBar: MatSnackBar,
    private dashboardService: DashboardService
  ) { 
    const dataLS: any = localStorage.getItem('restaurant')
    this.restaurantData = JSON.parse(dataLS);
    this.webSocketService.devicesOut.subscribe(
      (res) => {
        if(res.length > this.devices.length){
          this._snackBar.open('Nuevo Dispositivo Vinculado!!', 'Cerrar' ,{
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 3000
          });
        }        
        console.log(res);
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
    this.dashboardService.getDataLocal(this.restaurantData.name)
      .subscribe(
        async (response) => {
          console.log('Line 55', response.data());
          const restaurant = response.data()
          let newDevice: any = {
            status: 'Sin sincronizar'
          }
          if(restaurant.devices.length === 0){
            newDevice.code = `${restaurant.identifier}001`;
            newDevice.orderNumber = 1;
          } else {
            const lastDevice = restaurant.devices[ restaurant.devices.length - 1 ]
            const lastCode = (parseInt(lastDevice.code.substr(2)) + 1).toString();
            if(lastCode.length === 1){
              newDevice.code = `${restaurant.identifier}00${lastCode}`;
            } else if(lastCode.length === 2){
              newDevice.code = `${restaurant.identifier}0${lastCode}`;
            } else if(lastCode.length === 3){
              newDevice.code = `${restaurant.identifier}${lastCode}`;
            }

            newDevice.orderNumber = parseInt(lastDevice.orderNumber) + 1;
          }
          this.codeNewOrder = newDevice.code;

          restaurant.devices.push(newDevice);
          this.devices = restaurant.devices;
          this._snackBar.open('Nuevo Dispositivo Vinculado!!', 'Cerrar' ,{
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 3000
          });
          console.log(restaurant.devices);
          
          await this.dashboardService.updateDataLocal( {...restaurant} )
        }
      )
  }

  public alert(device: any){

    this.dashboardService.getDataLocal(this.restaurantData.name)
      .subscribe(
        async (response) => {
          const restaurant = response.data()

          restaurant.devices.forEach(
            (deviceE:any, index: number) => {
              if(deviceE.code === device.code){
                if(device.status === 'Sincronizado'){
                  deviceE.status = 'Listo y Avisado';
                }else if(device.status === 'Listo y Avisado') {
                  restaurant.devices.splice(index, 1);
                }
              }
            }
          )
          this.devices = restaurant.devices;
          this._snackBar.open('Dispositivos actualizado!!', 'Cerrar' ,{
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 3000
          });
          await this.dashboardService.updateDataLocal( {...restaurant} )
          device.idRestaurant = response.id;
          device.status === 'Sincronizado' && this.webSocketService.sendAlert({
            ...device,
            status: 'Listo y Avisado'
          });
        }
      )
  }



}
