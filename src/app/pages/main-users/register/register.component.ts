import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() restaurantSaved: EventEmitter<boolean> = new EventEmitter();

  nameLocal: string = '';
  
  dataInLS: boolean = false;


  constructor(
    private dashboardService: DashboardService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    if(this.existsDataInLS()){
      this.nameLocal = this.existsDataInLS().name;
      this.dataInLS = true;
    }
  }

  existsDataInLS(){
    let dataLS: any = this.cookieService.get('restaurant');
    let restaurant: any = null;
    if(this.cookieService.get('restaurant')){
      restaurant = JSON.parse(dataLS);
    }
    return restaurant;
  }

  async registerLocal() {
    const dataLocal = {
      name: this.nameLocal,
      devices: []
    }

    await this.dashboardService.createLocal( dataLocal);
    
    const dataLS = {
      name: this.nameLocal,
    }

    this.cookieService.set('restaurant', JSON.stringify(dataLS));
    this.restaurantSaved.emit(true);
  }

  public isDataLS(){
    this.restaurantSaved.emit(true);
  }

}
