import { HttpClient } from '@angular/common/http';
import { Signal, WritableSignal, effect, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Data, Pokedex } from './interfaces';

export class HttpRetrieverService<T> {

  private BASE = "https://api.pokemontcg.io/v2"; 

 

  
  httpClient = inject(HttpClient)

  response = signal<T|undefined>(undefined)

  constructor(){
    effect(()=>{
      console.log(this.response())
    })
  }

  getObservable(url:string):Observable<T>{
    return this.commonGet(url);
  }

  getSignal(url:string):WritableSignal<T|undefined>{
    this.commonGet(url).subscribe(data=>{
      this.response.set(data)
    })
    return this.response;
  }

  getUsingSignal(url:string,sig:WritableSignal<T|undefined>):void{
    this.commonGet(url).subscribe(data=>{
      sig?.set(data)
    })

    
  }

  private commonGet(url:string):Observable<T>{
    return this.httpClient.get<T>(this.BASE + url)
  }

  getWithDelay(delay:number,dt:T,sig:WritableSignal<T|undefined>){
      setTimeout(()=>{sig.set(dt)},delay*1000)
  }

}
