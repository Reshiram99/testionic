import { Component, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonThumbnail, IonList, IonItemGroup, IonItemDivider, IonItem, IonLabel, IonBadge, IonText, IonIcon, IonButton, IonFooter, IonToggle } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { TimerViewComponent } from "../shared/view/timer-view/timer-view.component";
import {chevronForwardOutline} from "ionicons/icons"
import { addIcons } from "ionicons";
import SETTINGS from "../data/profile-settings.json"
import { PageRoutes } from '../data/interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonToggle, IonFooter, IonButton, IonIcon, IonText, IonBadge, IonLabel, IonItem, IonItemDivider, IonItemGroup, IonList, IonThumbnail, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, TimerViewComponent],
})
export class Tab3Page {
  
  settings = signal<{(key :string):Array<PageRoutes>}>((SETTINGS as any as {(key :string):Array<PageRoutes>}))

  ngOnInit(){
    addIcons({chevronForwardOutline})
  }

  get keys(){
    return Object.keys(this.settings())
  }

  getSubKeys(key: string):Array<PageRoutes>{
    return this.settings()[key as keyof {(key :string):Array<PageRoutes>}]
  }
}
