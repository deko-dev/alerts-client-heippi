import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DashboardService } from '../../main-users/dashboard.service';
import { ARR_LETRAS } from 'src/app/utils/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  registerForm: FormGroup;

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dashboardService: DashboardService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { 
    this.registerForm = this.fb.group({
      nameRestaurant: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  ngOnInit(): void {
  }

  public async onSubmit(event: Event){
    event.preventDefault();
    event.stopPropagation();

    this.isLoading = true;

    const { nameRestaurant, email } = this.registerForm.getRawValue();
    let restaurant = {};

    this.dashboardService.getAllRestaurant()
      .subscribe(
        async (response) => {  

          const existsName = response.docs.filter( (doc) => doc.data().name === nameRestaurant );
          if(existsName.length){
            this._snackBar.open(
              'Nombre de Restaurante ya existe!!',
              'X',
              {
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              }
            )
            this.isLoading = false;
            return;
          }

          const existsEmail = response.docs.filter( (doc) => doc.data().email === email );
          if(existsEmail.length){
            this._snackBar.open(
              'Correo ya está registrado para otro restaurante!!',
              'X',
              {
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              }
            )
            this.isLoading = false;
            return;
          }

          const codAccess = Math.random().toString().substr(3, 4);

          restaurant = {
            name: nameRestaurant,
            email,
            identifier: this.generarCodigo(response.docs),
            codeAccess: [
              {
                codAccess,
                created_at: new Date(),
                is_used: false
              }
            ],
            devices: []
          }
          const responseMail = await this.dashboardService.createLocal( restaurant ); 
          if(responseMail){
            this._snackBar.open(
              'Registro existoso!!',
              'X',
              {
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              }
            )
            this.isLoading = false;
            this.router.navigateByUrl('dashboard');
          }
        }
      )

  }

  public generarCodigo(restaurants: any[]){
    let identifierNew = '';
    if(restaurants.length == 0){
      identifierNew = 'AA';
      return identifierNew;
    }


    const lastRestaurant = restaurants[ restaurants.length - 1 ].data();

    const identifierLastRestaurant = lastRestaurant.identifier;

    const letra1 = identifierLastRestaurant[0];
    const letra2 = identifierLastRestaurant[1];

    if(letra2 === 'Z'){
      identifierNew += ARR_LETRAS[ARR_LETRAS.indexOf(letra1) + 1] + ARR_LETRAS[0];
    }else {
      identifierNew += letra1 + ARR_LETRAS[ARR_LETRAS.indexOf(letra2) + 1]
    }

    return identifierNew;
  }

}
