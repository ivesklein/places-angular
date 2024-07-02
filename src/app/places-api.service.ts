import { EventEmitter, Injectable } from '@angular/core';

export interface place{
  id: String
  name:String
  description:String
  lat:number
  lon:number
}

@Injectable({
  providedIn: 'root'
})
export class PlacesApiService {

  changes = new EventEmitter();

  places:place[] = [
    {
      id: "String1",
      name:"String1",
      description:"String",
      lat: -33.51874968922604, 
      lon: -70.70455134443426
    },
    {
      id: "String2",
      name:"String2",
      description:"String",
      lat: -33.37938681337916,
      lon: -70.78973265694923
    },
    {
      id: "String3",
      name:"String3",
      description:"String",
      lat: -33.44658967966243,
      lon: -70.60226440429689
    },
  ]

  constructor() { }

  getAll() : place[]{
    return this.places;
  }


  delete(id: String) {
    /** thanks https://stackoverflow.com/a/45995630/2524558 for the copy/paste */
    let index = this.places.findIndex(d => d.id === id); //find index in your array
    this.places.splice(index, 1);//remove element from array
    this.changes.emit();
  }

}
