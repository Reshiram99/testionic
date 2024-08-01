import { Component, OnInit, Signal, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonFab, IonFabButton, IonIcon, IonFabList, IonRippleEffect, IonActionSheet, ActionSheetController, IonSkeletonText } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {Data, Pokedex} from '../data/interfaces'
import { HttpRetrieverService } from '../data/http-retriever.service';
import { add, chevronBack, chevronDown, chevronForward, chevronUp ,filterOutline} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Tab2Page } from "../tab2/tab2.page";
import { CommonService } from '../data/common.service';
import { PokeViewComponent } from "../shared/view/poke-view/poke-view.component";
import { PokeStore } from '../data/pokedex.store';


@Component({
  selector: 'app-pokedex',
  templateUrl: 'pokedex.page.html',
  styleUrls: ['pokedex.page.scss'],
  standalone: true,
  imports: [ IonSkeletonText, IonActionSheet, IonRippleEffect, IonFabList, IonIcon, IonFabButton, IonFab, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, Tab2Page, PokeViewComponent],
  providers:[PokeStore]
})
export class PokedexPage implements OnInit {
    httpRetriever = new HttpRetrieverService<Pokedex>();
    private commonService = inject(CommonService)
    store = inject(PokeStore)
    page = signal<number>(1);
    pageSize = signal<10|20|30>(10);
    response = signal<Pokedex|undefined>(undefined)
    // res = computed(()=>{
    //   return this.httpRetriever.getSignal(url)
    // })
    
    constructor(){
      addIcons({ add, chevronBack, chevronDown, chevronForward, chevronUp ,filterOutline});
      // effect(()=>{
        
      //   this.getResponse();
      // },{allowSignalWrites:true})
      
      
    }

    ngOnInit(): void {
      if(this.store.pokedex()===undefined){
         this.getResponse();
         console.log("init api called")
      }
      
     
    }

    getResponse()
    // :Signal<Pokedex|undefined>
    {
      let url ="/cards?pageSize="+this.pageSize()+"&page="+this.page()+"&orderBy=number,name";
      // this.httpRetriever.getObservable(url).subscribe(
      //   {
      //     next: (data)=>{
      //       this.response.set(data)
      //     }
      //   }
      // )

      // this.httpRetriever.getUsingSignal(url,this.response)

      // this.response = (this.httpRetriever.getSignal(url) )

      this.store.getDetails(this.httpRetriever)

      //  return this.httpRetriever.getSignal(url)

    }

   

}
