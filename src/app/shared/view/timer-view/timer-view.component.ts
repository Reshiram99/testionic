import { Component, OnInit, input, signal } from '@angular/core';
import { IonSkeletonText } from '@ionic/angular/standalone';
import { HttpRetrieverService } from 'src/app/data/http-retriever.service';

@Component({
  selector: 'app-timer-view',
  templateUrl: './timer-view.component.html',
  standalone:true,
  imports:[IonSkeletonText],
  styleUrls: ['./timer-view.component.scss'],
})
export class TimerViewComponent  implements OnInit {

  time = input.required<number>()
  showLoad = signal<boolean>(true)
  service = new HttpRetrieverService<boolean>()

  ngOnInit() {
    this.service.getWithDelay(this.time(),false,this.showLoad);
  }

}
