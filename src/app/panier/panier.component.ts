import { Component, OnInit } from '@angular/core';
import { MongoService } from './../service/mongo.service';
import { AuthService } from './../auth/auth.service';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  check: any;
  profile: any;
  Locations: any;
  Locations2: any;
  constructor(private mongoservice: MongoService, public auth: AuthService,private mapsAPILoader: MapsAPILoader) { }

  ngOnInit() {

  	if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
    
  	this.mongoservice.getLocationsByEmail(this.profile.nickname).subscribe(data => this.Locations2 = data.json())

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

  delete = function(id){

    this.mongoservice.deleteLocation(id)
    .subscribe(data => { alert(data.data) ; this.ngOnInit();}, error => this.errorMessage = error)

  }

  trie = function(){

    this.check = true;

    this.Locations = this.Locations2

    let shuffled = this.Locations
  .map((a) => ({sort: Math.random(), value: a}))
  .sort((a, b) => a.sort - b.sort)
  .map((a) => a.value)
   
    this.Locations = shuffled;
  }

  size = function(obj) {
    var size = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  }

}
