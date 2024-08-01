import { Component, OnInit, WritableSignal, signal,computed, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonRippleEffect } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HttpRetrieverService } from '../data/http-retriever.service';
import { Pokedex } from '../data/interfaces';
import { JsonPipe } from '@angular/common';
import { CommonService } from '../data/common.service';
import { PokeViewComponent } from "../shared/view/poke-view/poke-view.component";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonRippleEffect, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, JsonPipe, PokeViewComponent]
})
export class Tab2Page {
  
  commonService = inject(CommonService)

  

}
