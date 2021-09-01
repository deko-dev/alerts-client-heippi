import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainUsersComponent } from './main-users.component';
import { Routes, RouterModule } from '@angular/router';
import { SocketIoModule } from 'ngx-socket-io';
import { ServiceWorkerModule } from '@angular/service-worker';

const mainUsersRoutes: Routes = [
  {
    path: '',
    component: MainUsersComponent
  }
]


@NgModule({
  declarations: [
    MainUsersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(mainUsersRoutes),
    SocketIoModule,
    ServiceWorkerModule
  ]
})
export class MainUsersModule { }
