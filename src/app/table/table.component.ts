import { Component, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapPencil, bootstrapX } from '@ng-icons/bootstrap-icons';
import { PlacesApiService, place } from '../places-api.service';
import { NgFor, NgForOf } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  imports: [NgIconComponent, NgFor, NgForOf],
  providers: [provideIcons({ bootstrapPencil, bootstrapX })],
})
export class TableComponent {
  places:place[] = []
  placesService = inject(PlacesApiService)

  constructor(){
    console.log("Table constructor");
    (async () => {this.places = await this.placesService.getAll()})();
  }

  onDelete(id: String) {
    this.placesService.delete(id)
  }
}
