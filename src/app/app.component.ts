import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './map/map.component';
import { TableComponent } from "./table/table.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, MapComponent, TableComponent]
})
export class AppComponent {
  title = 'Places';



}
