import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private restaurantsCollection: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.restaurantsCollection = this.afs.collection<any>('restaurants');
  }

  public async createLocal( dataLocal: any): Promise<any>{
    const id = dataLocal.name.replaceAll(' ', '_').toLowerCase();
    await this.restaurantsCollection.doc(id).set({ ...dataLocal }, { merge: true });
  }
  
  public getDataLocal(nameLocal: any) {
    const id = nameLocal.replaceAll(' ', '_').toLowerCase();
    const restaurantCollection = this.afs.collection<any>(id);

    return restaurantCollection.valueChanges();
  }

}
