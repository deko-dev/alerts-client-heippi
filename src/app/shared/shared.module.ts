import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from './material';
import { environment } from '../../environments/environment.prod';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
    declarations: [],
    imports: [ 
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModules,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModules,
    ],
    providers: [],
})
export class SharedModule {}