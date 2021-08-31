import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterCodeComponent } from './register-code.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

const registerCodeRoutes: Routes = [
  {
    path: ':code',
    component: RegisterCodeComponent
  }
]

@NgModule({
  declarations: [
    RegisterCodeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(registerCodeRoutes),
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule
  ]
})
export class RegisterCodeModule { }
