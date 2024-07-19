import { Component, AfterViewInit, inject, Output, EventEmitter, Input } from '@angular/core';
import { bootstrapFloppy2Fill, bootstrapPlus, bootstrapSave, bootstrapSave2 } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import * as L from 'leaflet';
import { PlacesApiService, place } from '../places-api.service';
import { NgIf } from '@angular/common';

enum MapStatus{
  default,
  addPoint,
}

@Component({
  selector: 'MyMap',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [NgIconComponent, NgIf],
  providers: [provideIcons({ bootstrapPlus, bootstrapFloppy2Fill })],
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map | L.LayerGroup<any>;

  @Output() onAdd = new EventEmitter();
  @Output() onSave = new EventEmitter<Array<number>>();

  @Input()
  set reset(resetN: number) {
    if(resetN>0){
      if(this.newPoint!==undefined){
        this.map.removeLayer(this.newPoint);
      }
      this.status = MapStatus.default;
      console.log("reset")
    }
  }

  Status = MapStatus;
  status:MapStatus = MapStatus.default;
  nstatus = 0;

  newPoint!:L.Marker<any>;

  _onAdd(){
    console.log("map onAdd");
    this.status = MapStatus.addPoint;
    this.nstatus = 1;
    /* @ts-ignore:next-line */
    const center1 = this.map.getBounds();//{ lat:-33.45894275368763, lon:-70.46749229476947 }
    const center = center1.getCenter();//{ lat:-33.45894275368763, lon:-70.46749229476947 }
    if(this.newPoint!==undefined){
      this.map.removeLayer(this.newPoint);
    }
    this.newPoint = L.marker([center.lat, center.lng], {icon: this.addMarker}).addTo(this.map);
    this.onAdd.emit();
  }

  _onSave(){
    console.log("map onSave");
    const latlog = this.newPoint.getLatLng();
    this.onSave.emit([latlog.lat, latlog.lng]);
  }

  places:place[] = []
  markers:L.Marker<any>[] = []

  placesService = inject(PlacesApiService)

  blueMarker = L.icon({
    iconUrl: 'blue.png',
    shadowUrl: 'shadow.png',

    iconSize:     [38, 63], // size of the icon
    shadowSize:   [79, 48], // size of the shadow
    iconAnchor:   [18, 62], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 43],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  addMarker = L.icon({
    iconUrl: 'add.png',
    shadowUrl: 'shadow.png',

    iconSize:     [38, 63], // size of the icon
    shadowSize:   [79, 48], // size of the shadow
    iconAnchor:   [18, 62], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 43],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

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

    this.map.on('move', (e) => {
      if(this.status == MapStatus.addPoint){
        const center = theMap.getCenter();
        this.newPoint.setLatLng(center);
      }
    });

    

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
      let marker = L.marker([place.lat, place.lon], {icon: this.blueMarker}).addTo(this.map);
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