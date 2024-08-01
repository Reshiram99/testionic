import { Component, OnInit ,inject,input} from '@angular/core';
import { ActionSheetController ,IonCardSubtitle, IonRippleEffect,IonCardTitle, IonCardHeader, IonCard, IonHeader, IonToolbar, IonTitle, IonContent, ToastController, ModalController } from '@ionic/angular/standalone';
import { CommonService } from 'src/app/data/common.service';
import { Data } from 'src/app/data/interfaces';
import { ActivatedRoute } from '@angular/router';
import { PokedexPage } from 'src/app/pokedex/pokedex.page';
import { PokeModalComponent } from '../poke-modal/poke-modal.component';

@Component({
  selector: 'app-poke-view',
  templateUrl: './poke-view.component.html',
  styleUrls: ['./poke-view.component.scss'],
  standalone: true,
  imports: [IonRippleEffect, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonHeader, IonToolbar, IonTitle, IonContent]
})
export class PokeViewComponent implements OnInit  {
   data = input.required<Data>();
   commonService = inject(CommonService)
   router = inject(ActivatedRoute);
   
   private actionSheetButtons = [
    {
      text: 'View',
      data: {
        action: 'view',
      },
    },
    
  ];
  private actionSheetOptions = {
    header: 'Actions',
    buttons:this.actionSheetButtons
  } 
  actionSheetCtrl = inject(ActionSheetController);
  toastCtrl = inject(ToastController)
  modalCtrl = inject(ModalController)

  ngOnInit(): void {
    if(this.router.component?.name === PokedexPage.name){
      this.actionSheetButtons.push({
        text: 'Add to fav',
        data: {
          action: 'addToFav',
        },
      })
    }
  }

   async openActionSheet(data:Data){
   
    const actionSheet = await this.actionSheetCtrl.create( this.actionSheetOptions);
    await actionSheet.present();
    var result =await actionSheet.onDidDismiss()
    var event = result?.data?.action
    if(event === "addToFav"){
        this.commonService.favs.update(fav=> {
          let newfav=[...(fav),data]
          return newfav;
        } )
        let toast = await this.toastCtrl.create({
          message: 'added favs',
          duration: 1500,
          position: 'bottom',
        })
        toast.present();
    }else if(event === "view"){
      const modal = await this.modalCtrl.create({
        component: PokeModalComponent,
        componentProps: {img:this.data}
      });
      modal.present();

      await modal.onWillDismiss();
    }
    
  }
 
}
