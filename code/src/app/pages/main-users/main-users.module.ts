import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainUsersComponent } from './main-users.component';
import { Routes, RouterModule } from '@angular/router';
import { SocketIoModule } from 'ngx-socket-io';
import { SharedModule } from '../../shared/shared.module';
import { DevicesComponent } from './devices/devices.component';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');

const mainUsersRoutes: Routes = [
  {
    path: '',
    component: MainUsersComponent
  }
]


@NgModule({
  declarations: [
    MainUsersComponent,
    DevicesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(mainUsersRoutes),
    SocketIoModule,
    SharedModule
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'es'
    }
  ]
})
export class MainUsersModule { }
