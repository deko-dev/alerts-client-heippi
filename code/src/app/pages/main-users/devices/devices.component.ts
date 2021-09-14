import { Component, OnInit } from '@angular/core';
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
    private dashboardService: DashboardService
  ) { 
    const dataLS: any = localStorage.getItem('restaurant')
    this.restaurantData = JSON.parse(dataLS);
    this.webSocketService.devicesOut.subscribe(
      (res) => {       
        this.devices = res;
      }
    )
  }

  ngOnInit(): void {    
  }

  public generarUUID(sizeUUID: number){
    return Math.random().toString().substr(3, sizeUUID);
  }

  public newDevie(){ 
    this.dashboardService.getDataLocal(this.restaurantData.name)
      .subscribe(
        async (response) => {
          const restaurant = response.data()
          let newDevice: any = {
            status: 'Sin sincronizar',
            is_used: false
          }
          if(restaurant.devices.length === 0){
            newDevice.code = `${restaurant.identifier}001`;
            newDevice.orderNumber = 1;
          } else {
            const lastDevice = restaurant.devices[ restaurant.devices.length - 1 ]
            const lastCode = (lastDevice.orderNumber + 1).toString();
            console.log('Line 58:', lastCode);
            if(lastCode.length === 1){
              newDevice.code = `${restaurant.identifier}00${lastCode}`;
            } else if(lastCode.length === 2){
              newDevice.code = `${restaurant.identifier}0${lastCode}`;
            } else if(lastCode.length === 3){
              newDevice.code = `${restaurant.identifier}${lastCode}`;
            }

            newDevice.orderNumber = parseInt(lastCode);
          }
          this.codeNewOrder = newDevice.code;
          restaurant.devices.push(newDevice);
          this.devices = restaurant.devices;         
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
                }else if(device.status === 'En camino') {
                  restaurant.devices.splice(index, 1);
                }
              }
            }
          )
          this.devices = restaurant.devices;
          await this.dashboardService.updateDataLocal( {...restaurant} )
          device.idRestaurant = response.id;
          (device.status === 'Sincronizado' || device.status === 'En camino') && this.webSocketService.sendAlert({
            ...device,
            status: device.status === 'Sincronizado' ? 'Listo y Avisado' : 'Finalizado'
          });
        }
      )
  }



}
