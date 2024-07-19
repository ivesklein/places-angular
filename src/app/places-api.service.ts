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
      id: "id1",
      name:"String1",
      description:"String",
      lat: -33.51874968922604, 
      lon: -70.70455134443426
    },
    {
      id: "id2",
      name:"String2",
      description:"String",
      lat: -33.37938681337916,
      lon: -70.78973265694923
    },
    {
      id: "id3",
      name:"String3",
      description:"String",
      lat: -33.44658967966243,
      lon: -70.60226440429689
    },
  ]

  constructor() { }

  add(name:string,description:string,lat:number, lon:number){
    this.places.push({
      id: name+lat+lon,
      name: name,
      description: description,
      lat: lat,
      lon: lon,
    });
    this.changes.emit();
  }

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
