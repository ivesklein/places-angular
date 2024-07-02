import { Component, AfterViewInit, inject } from '@angular/core';
import { bootstrapPlus } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import * as L from 'leaflet';
import { PlacesApiService, place } from '../places-api.service';

@Component({
  selector: 'MyMap',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [NgIconComponent],
  providers: [provideIcons({ bootstrapPlus })],
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map | L.LayerGroup<any>;

  places:place[] = []
  markers:L.Marker<any>[] = []

  placesService = inject(PlacesApiService)

  private initMap(): void {
    console.log("Map initMap")
    this.map = L.map('map', {
      center: [ -33.45894275368763, -70.46749229476947 ],
      zoom: 8
    });


    const tiles = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    /*const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });*/

    this.map.on("moveend", (a) => {
      console.log(a.target._lastCenter, a.target._zoom);
    });

    /** https://gis.stackexchange.com/a/90230 
    // Add in a crosshair for the map
    const crosshairIcon = L.icon({
      iconUrl: 'images/crosshair.png',
      iconSize:     [20, 20], // size of the icon
      iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
    });
    const crosshair = L.marker(this.map.getCenter(), {icon: crosshairIcon});
    crosshair.addTo(this.map);

    // Move the crosshair to the center of the map when the user pans
    
    this.map.on('move', (e) => {
      crosshair.setLatLng(theMap.getCenter());
    });*/

    const theMap = this.map;

    tiles.addTo(this.map);


    
    this.updateMap()

  }

  constructor() {
    console.log("Map constructor")
    this.places = this.placesService.getAll()


    this.placesService.changes.subscribe(() => this.updateMap() );
  


  }

  updateMap(){
    //clear markers
    for(const index in this.markers){
      this.map.removeLayer(this.markers[index]);
    }

    /** add points */
    this.places.forEach(place => {
      let marker = L.marker([place.lat, place.lon]).addTo(this.map);
      this.markers.push(marker)
    });

  }

  ngAfterViewInit(): void {
    console.log("Map ngAfterViewInit")
    this.initMap();
  }

  ngOnChanges(){
    console.log("Map ngOnChanges")
  }


}