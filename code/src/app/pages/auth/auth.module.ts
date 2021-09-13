import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AuthComponent } from './auth.component';
import { CodeAccessComponent } from './code-access/code-access.component';

const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: SignInComponent
      },
      {
        path: 'register',
        component: SignUpComponent
      },
      {
        path: 'code_access',
        component: CodeAccessComponent
      },
    ]
  },
]

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    AuthComponent,
    CodeAccessComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(authRoutes)
  ]
})
export class AuthModule { }
