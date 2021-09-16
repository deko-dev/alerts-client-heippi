import { Component, OnInit } from '@angular/core';
import { RegisterCodeService } from './register-code.service';
import { SwPush } from '@angular/service-worker';
import { environment } from '../../../environments/environment.prd';
import { DashboardService } from '../main-users/dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-code',
  templateUrl: './register-code.component.html',
  styleUrls: ['./register-code.component.scss']
})
export class RegisterCodeComponent implements OnInit {
  codeDevice: string = '';

  isAlert: boolean = false;

  isLoading: boolean = false;

  pushSubscription: any = {};

  isPermission: boolean = false;

  noButton: boolean = false;

  public dataInCookie: boolean = false;

  audio = new Audio();

  constructor(
    private registerCodeService: RegisterCodeService,
    private swPush: SwPush,
    private dashboardService: DashboardService,
    private _snackBar: MatSnackBar
  ) {
    
  }

  ngOnInit() { 
    this.registerCodeService.alertOut.subscribe(
      (res) => {
        this.audio = new Audio('assets/audios/charles_hei_yuhu.mp3');

        if(res.status === 'Listo y Avisado'){
          window.navigator.vibrate(180000);
          this.isAlert = true;
          localStorage.setItem('device', JSON.stringify(res));
          this.audio.play();
        }

        if(res.status === 'Finalizado'){
          this.dataInCookie = false;
          this.codeDevice = '';
          this.isAlert = false;
          localStorage.removeItem('device');
        }
      }
    )

    if(Notification.permission === 'default'){
      this.subscribePushNotification();
    } else {
      this.isPermission = true;
      this.swPush.subscription.subscribe((response) => {
          this.pushSubscription = response;
      })
    }
      
    if(localStorage.getItem('device')){
      const dataLS: any = localStorage.getItem('device');
      const device = JSON.parse(dataLS);
      this.codeDevice = device.code;
      this.registerCodeService.registerCode( device );
      this.dataInCookie = true;
      this.noButton = true;
      if( device.status === 'Listo y Avisado'){
        window.navigator.vibrate(180000);
        this.isAlert = true;
      }
    }
  }

  register(){
    this.isLoading = true;
    this.codeDevice = this.codeDevice.toUpperCase();
    this.dashboardService.getAllRestaurant()
      .subscribe(
        async (response) => {  
          const identifier = this.codeDevice.substr(0, 2);
          const existeRestaurant = response.docs.filter( (doc) => doc.data().identifier === identifier );
          if(existeRestaurant.length){
            const devices: any[] = existeRestaurant[0].data().devices;

            const foundCode = devices.some( (device:any) => {
              return (device.code === this.codeDevice && !device.is_used);
            })

            if(foundCode){
              const payload = {
                idRestaurant: existeRestaurant[0].id, 
                code: this.codeDevice,
                pushSubscription: this.pushSubscription,
                is_used: true
              };
              this.registerCodeService.registerCode(payload);
              localStorage.setItem('device',JSON.stringify(payload))
              this.dataInCookie = true;
              this.noButton = true;
              this.isLoading = false;
              this.snackOpen('Codigo Correcto!!');
              return;
            }else {
              console.log('No existe');
              this.snackOpen('Codigo No existe o Ya fue usado!!');
              this.isLoading = false;
              return;
            }
          }else {
            this.snackOpen('Codigo invalido!!')
            this.isLoading = false;
            return;
          }
          

        }
      )
  }

  subscribePushNotification() {
    this.swPush.requestSubscription({ serverPublicKey: environment.vapidPublicKey })
      .then(
        (response) => {
          this.pushSubscription = response;
          this.isPermission = true;
        }
      ).catch( console.log );
  }

  request(){
  }

  stopVibrate(){
    this.dashboardService.getAllRestaurant()
    .subscribe(
      async (response) => {  
        const identifier = this.codeDevice.substr(0, 2);
        const existeRestaurant = response.docs.filter( (doc) => doc.data().identifier === identifier );
        if(existeRestaurant.length){
          const devices = existeRestaurant[0].data().devices;
          devices.forEach(async (device:any, index: number) => {
              if(device.code === this.codeDevice){
                
                existeRestaurant[0].data().devices[index].status = 'En Camino';
                await this.dashboardService.updateDataLocal( { ...existeRestaurant[0].data() } )
                const payload = {
                  idRestaurant: existeRestaurant[0].id, 
                  code: this.codeDevice,
                  status: 'En camino',
                  is_used: true
                };
                this.registerCodeService.registerCode( payload );
                window.navigator.vibrate(0);
                this.audio.pause();
                localStorage.setItem('device', JSON.stringify(payload));
                this.noButton = false;
                return;
              }
          });
        }
        

      }
    )
  }

  private snackOpen( msg: string ){
    this._snackBar.open( msg, 'X',
      {
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        duration: 3000
      }
    )
  }


}
