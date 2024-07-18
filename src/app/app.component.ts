import { Component, EventEmitter } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './map/map.component';
import { TableComponent } from "./table/table.component";
import { PopupComponent } from './popup/popup.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, MapComponent, TableComponent, PopupComponent]
})
export class AppComponent {
  title = 'Places';
  openModal = 0;
  resetStatus = 0;

  onAdd = function(){
    console.log("onAdd")
  }

  onSave = () => {
    this.openModal++;
    console.log("onSave")
  }

  onSaveModal() {
    this.resetStatus++;
  }

  onCloseModal() {
    this.resetStatus++;
  }


}
