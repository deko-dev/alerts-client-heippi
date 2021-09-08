import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../main-users/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-code-access',
  templateUrl: './code-access.component.html',
  styleUrls: ['./code-access.component.scss']
})
export class CodeAccessComponent implements OnInit {

  codeAccess: string[] = [''];
  email: string = '';
  isLoading: boolean = false;

  constructor(
    private dashboardService: DashboardService,
    private aRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { 
    this.email = this.aRoute.snapshot.queryParams.email;
  }

  ngOnInit(): void {
  }

  focusNext(event: any, digitNext?: any){
    if(event.target.value.length > 0){
      digitNext.focus();
    }
  }

  checkCodeAccess() {
    this.isLoading = true; 
    this.dashboardService.getAllRestaurant()
      .subscribe(
        async (response) => {  

          const existsEmail = response.docs.filter( (doc) => doc.data().email === this.email );
          if(existsEmail.length){
            let restaurant = existsEmail[0].data();
            const lastCodeAccess = restaurant.codeAccess[ restaurant.codeAccess.length - 1];

            if(lastCodeAccess.codAccess === this.codeAccess.join('')){
              if(!lastCodeAccess.is_used){
                restaurant.id = existsEmail[0].id;
                restaurant.codeAccess.forEach((cod: any) => {
                    if(cod.codAccess === this.codeAccess.join('')){
                      cod.is_used = true;
                    }
                });
                this.isLoading = false;
                await this.dashboardService.updateCodeAccessUsed( {...restaurant} )
                this.router.navigateByUrl('dashboard');
              } else {
                this.snackOpen('Este codigo ya fué usado' )
              }
              this.isLoading = false;
              return;
            }else{
              this.snackOpen( 'Este Código no existe!!!' )
              this.isLoading = false;
              return;
            }
          } else {
            this.snackOpen( 'Correo no está registrado!!' )
            this.isLoading = false;
            return;
          }
        }
      )

  }

  private snackOpen( msg: string ){
    this._snackBar.open( msg, 'X',
      {
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      }
    )
  }

  newCode(){
    this.isLoading = true;
    this.dashboardService.getAllRestaurant()
      .subscribe(
        async (response) => {  

          const existsEmail = response.docs.filter( (doc) => doc.data().email === this.email );
          if(existsEmail.length){
            const codAccess = {
              codAccess: Math.random().toString().substr(3, 4),
              created_at: new Date(),
              is_used: false
            };
            let restaurant = existsEmail[0].data();
            restaurant.id = existsEmail[0].id;
            restaurant.codeAccess.push(codAccess);
            restaurant.currentCodeAccess = codAccess.codAccess;
            const responseMail = await this.dashboardService.loginRestaurant( {...restaurant} ); 
            if(responseMail){
              this.snackOpen(`Codigo enviado al correo ${this.email}`);
              this.isLoading = false;
            }

          }else {
            this.snackOpen('Correo no está registrado!!')
            this.isLoading = false;
            return;
          }
        }
      )
  }

}
