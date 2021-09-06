import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { CookieService } from 'ngx-cookie-service';
import { DashboardService } from './dashboard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-users',
  templateUrl: './main-users.component.html',
  styleUrls: ['./main-users.component.scss']
})
export class MainUsersComponent implements OnInit {

  isLoading: boolean = false;
  listDevices: any[] = [];
  restaurantSaved: boolean = false;
  nameLocal: string = '';

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {}

  restauranteSalvado( event: any){
    this.restaurantSaved = event;
  };

}
