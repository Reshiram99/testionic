import { Component, OnInit, inject, input } from '@angular/core';
import {IonHeader,IonToolbar,IonButtons,IonButton,IonTitle,IonContent,IonItem,IonImg, ModalController} from '@ionic/angular/standalone'
import { Data } from 'src/app/data/interfaces';


@Component({
  selector: 'app-poke-modal',
  templateUrl: './poke-modal.component.html',
  standalone:true,
  imports:[IonHeader,IonToolbar,IonButtons,IonButton,IonTitle,IonContent,IonItem,IonImg],
  styleUrls: ['./poke-modal.component.scss']
})
export class PokeModalComponent  {

  ctrl = inject(ModalController);

  img = input.required<Data>();

  cancel() {
    return this.ctrl.dismiss(null, 'cancel');
  }

}
