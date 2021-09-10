import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { CookieService } from 'ngx-cookie-service';
import { DashboardService } from './dashboard.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-users',
  templateUrl: './main-users.component.html',
  styleUrls: ['./main-users.component.scss']
})
export class MainUsersComponent implements OnInit {

  currentDate: Date = new Date();
  restaurantSaved: boolean = false;

  restaurantData: any = {};

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) { 
    const dataLS: any = localStorage.getItem('restaurant')
    this.restaurantData = JSON.parse(dataLS);
  }

  ngOnInit(): void {}

  restauranteSalvado( event: any){
    this.restaurantSaved = event;
  };


  logout() {
    localStorage.removeItem('restaurant');
    this.router.navigateByUrl('auth/login');
  }
}
