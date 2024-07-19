import { Component, EventEmitter, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './map/map.component';
import { TableComponent } from "./table/table.component";
import { PopupComponent } from './popup/popup.component';
import { PlacesApiService } from './places-api.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, MapComponent, TableComponent, PopupComponent]
})
export class AppComponent {
  
  placesService = inject(PlacesApiService)
  
  title = 'Places';
  openModal = 0;
  resetStatus = 0;

  lat = 0;
  lon = 0;

  onAdd = function(){
    console.log("onAdd")
  }

  onSave = ([lat, lon]:Array<number>) => {
    this.lat = lat;
    this.lon = lon;
    this.openModal++;
    console.log("onSave")
  }

  onSaveModal([name, desc]:Array<string>) {
    console.log("onSaveModal", [name, desc])
    this.placesService.add(name, desc, this.lat, this.lon);
    this.resetStatus++;
  }

  onCloseModal() {
    this.resetStatus++;
  }


}
