import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { Routes, RouterModule } from '@angular/router';
import { SocketIoModule } from 'ngx-socket-io';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const chatRoutes: Routes = [
  {
    path: '',
    component: ChatComponent
  }
]

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(chatRoutes),
    SocketIoModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ChatModule { }
