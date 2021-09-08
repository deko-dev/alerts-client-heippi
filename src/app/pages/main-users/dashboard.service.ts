import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private restaurantsCollection: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient
  ) {
    this.restaurantsCollection = this.afs.collection<any>('restaurants');
  }

  public async createLocal( dataLocal: any): Promise<any>{
    const id = dataLocal.name.replaceAll(' ', '_').toLowerCase();
    
    try {
      await this.restaurantsCollection.doc(id).set(dataLocal);
      return this.http.post(
        `${environment.serverSocket}api/v1/codeAccess`,
        dataLocal
      ).toPromise();
    } catch (error) {
      console.log(error); 
    }   
  }
  
  public async loginRestaurant( dataLogin: any ): Promise<any>{
    try {
      await this.restaurantsCollection.doc(dataLogin.id).update(dataLogin);
      return this.http.post(
        `${environment.serverSocket}api/v1/codeAccess`,
        dataLogin
      ).toPromise();
    } catch (error) {
      console.log(error); 
    }   
  }

  public async updateCodeAccessUsed( dataRestaurant: any ): Promise<any>{
    try {
      await this.restaurantsCollection.doc(dataRestaurant.id).update(dataRestaurant);
    } catch (error) {
      console.log(error); 
    }   
  }

  public getDataLocal(nameLocal: any) {
    const id = nameLocal.replaceAll(' ', '_').toLowerCase();
    const restaurantCollection = this.afs.collection<any>(id);

    return restaurantCollection.valueChanges();
  }

  public getAllRestaurant(){
    return this.restaurantsCollection.get();
  }

}
