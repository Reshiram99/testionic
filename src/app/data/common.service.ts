import { Injectable, signal } from '@angular/core';
import { Data } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  favs = signal<Data[]>([])
}
