import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  async createUser( dataRegister: any ){
    const { nameRestaurant, email, password } = dataRegister;
    let resgisterUser, sendEmail;
    try {
      resgisterUser = await this.afAuth.createUserWithEmailAndPassword( email, password );
      await resgisterUser.user?.sendEmailVerification(
        {
          url: 'https://alerts-heippi.netlify.app/auth/login',
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async login( dataLogin: any  ){
    const { email, password } = dataLogin;
    let response;
    try {
      response = await this.afAuth.signInWithEmailAndPassword( email, password );
    } catch (error) {
      console.log(error);
    }
  }
}