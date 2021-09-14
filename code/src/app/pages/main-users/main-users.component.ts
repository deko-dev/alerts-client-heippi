import { Component, OnInit } from '@angular/core';
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
    private router: Router
  ) { }

  ngOnInit(): void {
    const dataLS: any = localStorage.getItem('restaurant')
    this.restaurantData = JSON.parse(dataLS);
  }

  restauranteSalvado( event: any){
    this.restaurantSaved = event;
  };

  logout() {
    localStorage.removeItem('restaurant');
    this.router.navigateByUrl('auth/login');
  }
}
