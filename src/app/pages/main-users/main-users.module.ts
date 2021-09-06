import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainUsersComponent } from './main-users.component';
import { Routes, RouterModule } from '@angular/router';
import { SocketIoModule } from 'ngx-socket-io';
import { SharedModule } from '../../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { DevicesComponent } from './devices/devices.component';

const mainUsersRoutes: Routes = [
  {
    path: '',
    component: MainUsersComponent
  }
]


@NgModule({
  declarations: [
    MainUsersComponent,
    RegisterComponent,
    DevicesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(mainUsersRoutes),
    SocketIoModule,
    SharedModule
  ]
})
export class MainUsersModule { }
