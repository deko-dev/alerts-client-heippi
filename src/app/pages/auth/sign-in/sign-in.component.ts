import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DashboardService } from '../../main-users/dashboard.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private cookieService: CookieService
  ) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
  }

  public onSubmit(event: Event){
    event.preventDefault();
    event.stopPropagation();

    this.isLoading = true;

    const { email } = this.loginForm.getRawValue();

    this.dashboardService.getAllRestaurant()
      .subscribe(
        async (response) => {  

          const existsEmail = response.docs.filter( (doc) => doc.data().email === email );
          if(existsEmail.length){
            const codAccess = {
              codAccess: Math.random().toString().substr(3, 4),
              created_at: new Date(),
              is_used: false
            };
            let restaurant = existsEmail[0].data();
            restaurant.id = existsEmail[0].id;
            restaurant.codeAccess.push(codAccess);
            const responseMail = await this.dashboardService.loginRestaurant( {...restaurant} ); 
            if(responseMail){
              this._snackBar.open(
                'Redirigiendo a OTP!!',
                'X',
                {
                  horizontalPosition: 'right',
                  verticalPosition: 'bottom',
                }
              )
              this.isLoading = false;
              this.cookieService.set('restaurant', JSON.stringify(restaurant));
              this.router.navigateByUrl(`auth/code_access?email=${restaurant.email}`);
            }

          }else {
            this._snackBar.open(
              'Correo no está registrado!!',
              'X',
              {
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              }
            )
            this.isLoading = false;
            return;
          }
        }
      )

  }

}
