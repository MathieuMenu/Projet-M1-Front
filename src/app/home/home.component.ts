import { Component } from '@angular/core';
import { AuthService } from './../auth/auth.service';

import { ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';

import { MongoService } from './../service/mongo.service';
import { Http } from '@angular/http';

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
  public Locations:any;

  public persoLong:number;
  public persoLat:number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private http: Http,public auth: AuthService,private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private mongoservice: MongoService) { }

  get expiresAt() {
    return this.auth.expiresAt;
  }

  getpos(originlat,originlong,destinationlat,destinationlong){
    this.mapsAPILoader.load().then(() => {
      let directionsService = new google.maps.DirectionsService();
      directionsService.route({origin:'Saint-Quentin', destination:'Tergnier', travelMode:google.maps.TravelMode.DRIVING}, function(result, status){
        if(status == google.maps.DirectionsStatus.OK){
          console.log(result);
          console.log(result.routes[0].legs[0].distance.text);
        }
      });
    });
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
      let directionsService = new google.maps.DirectionsService();
      directionsService.route({origin:'Saint-Quentin', destination:'Tergnier', travelMode:google.maps.TravelMode.DRIVING}, function(result, status){
        if(status == google.maps.DirectionsStatus.OK){
          console.log(result);
        }
      });

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

    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    }

    this.mongoservice.getLocationsByEmail(this.profile.nickname).subscribe(data => this.Locations = data.json());

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

  addPanier = function(){

    var location = this.size(this.Locations);

    if(location < 14){

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

      this.mongoservice.saveLocation(poi)
      .subscribe(data => { alert(data.data) }, error => this.errorMessage = error)

    }
    else{
      throw Error('Vous avez deja 14 élements dans votre panier veuillez en supprimer');
    }
    
  }

  size = function(obj) {
    var size = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  }

    //this.http.get('https://maps.googleapis.com/maps/api/directions/json?origin=49.662127924296264,3.281543254852295&destination=49.657280276230104,3.2983875274658203&key=AIzaSyC3XF5TNYa5R_k69Ik2_bjmf_URIPgYK7s').subscribe(data => this.distance = data.json())

}
