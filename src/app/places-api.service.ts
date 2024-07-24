import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface place{
  id: string
  name:string
  description:string
  lat:number
  lon:number
}

/** thanks chatgpt */
function createThrottledFunction<T extends (...args: any[]) => any>(fn: T): T {
  let data: ReturnType<T>;
  let lastCalled: number = 0;

  return function (this: any, ...args: Parameters<T>): ReturnType<T> {
    const now = Date.now();
    if (now - lastCalled < 200 && data !== undefined) {
      return data;
    }
    data = fn.apply(this, args);
    lastCalled = now;
    return data;
  } as T;
}

@Injectable({
  providedIn: 'root'
})
export class PlacesApiService {
  private apiUrl = environment.apiUrl;

  changes = new EventEmitter();

  localPlaces:place[] = [
    /*{
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
    },*/
  ]

  constructor(private http: HttpClient) {}


  add(name:string,description:string,lat:number, lon:number){

    return new Promise((resolve, reject) => {
      const newplace = {name,description,lat,lon};
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      
      this.http.post<place>(this.apiUrl, newplace, { headers }).subscribe(data => {
        this.localPlaces.push(data);
        this.changes.emit();
        resolve(data);
      });
    })

  }

  getAll = createThrottledFunction(this._getAll);

  _getAll() : Promise<place[]>{
    return new Promise((resolve, reject) => {
      console.log("getAll service")
      const query = this.http.get<place[]>(this.apiUrl).subscribe(data => {
        this.localPlaces = data;
        this.changes.emit();
        console.log("getAll emit", data)
        resolve(data);
      });
    })
  }


  delete = createThrottledFunction(this._delete);
  _delete(id: String) {
    /** thanks https://stackoverflow.com/a/45995630/2524558 for the copy/paste */
    let index = this.localPlaces.findIndex(d => d.id === id); //find index in your array
    this.localPlaces.splice(index, 1);//remove element from array
    this.changes.emit();
  }

}
