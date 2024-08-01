import {  patchState, signalStore, withComputed, withMethods, withState ,withHooks, SignalStoreFeature, SignalStoreFeatureResult, signalStoreFeature, getState} from '@ngrx/signals';
import {Data, Pokedex} from './interfaces'
import { Signal, WritableSignal, computed, effect } from '@angular/core';
import { HttpRetrieverService } from './http-retriever.service';


type PokedexState ={
    pokedex : Pokedex|undefined;
    page:number
    favs: Array<Data>
}

function getStateInit(){

    return withState(init)
}

const init : PokedexState= {
    pokedex:undefined,
    page:1,
    favs:[]
}


export const PokeStore = signalStore(
    // { providedIn: 'root' },
    withState(init),
    withPersistStorage("POKEDEX"),
    withComputed(({pokedex,page})=>({
        url : computed(()=>{
            return "/cards?pageSize="+10+"&page="+page()+"&orderBy=number,name";
        })
    })),
    withMethods(store=>({
        getDetails:(httpRetriever: HttpRetrieverService<Pokedex>)=>{
            
            patchState(store,(state)=>({pokedex:undefined}))
            httpRetriever.getObservable(store.url()).subscribe({
                next:(data)=>{
                    patchState(store,(state)=>({pokedex:data}))
                }
            })
        },
        nextPage:()=>{
            
            patchState(store,(state)=>{
                
                return {page:state.page+1}
            })
        },
        prevPage:()=>{
            patchState(store,(state)=>{
                return {page:state.page-1}
            })
        }
    })),
    withHooks({
        onInit(store) {
            let httpRetriever = new HttpRetrieverService<Pokedex>();
            effect(()=>{
                store.getDetails(httpRetriever)
            },{allowSignalWrites:true})

        }
    ,}),
    withSignalStoreLogger("POKEDEX")
  );


  function withPersistStorage(storeName:string){
    
    return signalStoreFeature(
        withHooks({
            onInit(store){
                let savedStr = localStorage.getItem(storeName)
                let saved:any= {}
                if(savedStr){
                    saved = JSON.parse(savedStr)
                    patchState(store,saved)
                    console.log("STORE INIT SUCCESS")
                }
                effect(() => {
                    const state = getState(store);
                    localStorage.setItem(storeName,JSON.stringify(state))
                  });
            }
        })
    )
  }


  function withSignalStoreLogger(storeName:string){
        return (data:any)=>{
            for(let mtd in data.methods as any){
              
               let f = (data.methods as any)[mtd] as Function
               let m = (...args:any[])=>{
                console.groupCollapsed(storeName+ " Action called =>"+mtd)
                console.time(mtd)
                f(...args)
                console.timeEnd(mtd)
                for(let stt in data.stateSignals as any){
                    console.log(stt,(data.stateSignals as any)[stt]())
                } 
                
                console.groupEnd();
                
               }
               (data.methods as any)[mtd]=m
            }
            effect(()=>{
                console.groupCollapsed(storeName+" Store effect called ")
                console.trace()
                for(let stt in data.stateSignals as any){
                    console.log(stt,(data.stateSignals as any)[stt]())
                } 
                console.groupEnd();
            })
            return data
        }
  }