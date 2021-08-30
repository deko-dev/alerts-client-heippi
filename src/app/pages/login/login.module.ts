import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';

import { SocketIoModule } from 'ngx-socket-io';
import { ReactiveFormsModule } from '@angular/forms';

const loginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(loginRoutes),
    SocketIoModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
