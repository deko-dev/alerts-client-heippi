import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterCodeComponent } from './register-code.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
    FormsModule
  ]
})
export class RegisterCodeModule { }
