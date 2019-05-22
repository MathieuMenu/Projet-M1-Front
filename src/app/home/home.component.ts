import { Component } from '@angular/core';
import { AuthService } from './../auth/auth.service';

import { ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';

import { MongoService } from './../service/mongo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  profile: any;
  title = 'mmfront';

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  public testperso:any;
  test:any;

  public persoLong:number;
  public persoLat:number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(public auth: AuthService,private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private mongoservice: MongoService) { }

  get expiresAt() {
    return this.auth.expiresAt;
  }

  ngOnInit() {

  	this.zoom = 8;
    this.latitude = 49.8489;
    this.longitude = 3.2876;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

    this.mongoservice.getLocations().subscribe(data => this.testperso = data.json())

    this.test = json.parse(this.testperso);

    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    }

  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  getCoords(event){
    console.log(event.coords);
    this.persoLat = event.coords.lat;
    this.persoLong = event.coords.lng;
  }

  addPanier(){

    var titre = document.getElementsByClassName("title");

    var address = document.getElementsByClassName("address-line");

    var poi = {
      long:this.persoLong,
      lat:this.persoLat,
      add1:address[0].innerHTML,
      add2:address[1].innerHTML,
      add3:address[2].innerHTML,
      titre:titre[0].innerHTML,
      email:this.profile.nickname
    }

    console.log(poi);

    this.mongoservice.saveLocation(poi).subscribe()
  }

}
