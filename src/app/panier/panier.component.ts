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
  Distance: any = [];
  directionsService: any;
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
    
    this.mapsAPILoader.load().then(() => {
    this.directionsService = new google.maps.DirectionsService();
    });

  }

  getpos(originlat,originlong,destinationlat,destinationlong){
    
    var montest = this.directionsService.route({origin:originlat+","+originlong, destination:destinationlat+","+destinationlong, travelMode:google.maps.TravelMode.DRIVING}, function(result, status){
      if(status == google.maps.DirectionsStatus.OK){
        console.log(result.routes[0].legs[0].distance.text);
        return (result.routes[0].legs[0].distance.text);
      }
    });
    console.log(montest);
    return montest;
    
  }

  delete = function(id){

    this.mongoservice.deleteLocation(id)
    .subscribe(data => { alert(data.data) ; this.ngOnInit();}, error => this.errorMessage = error)

  }

  trie = function(){

    for(let i = 0; i < this.size(this.Locations2);i=i+2){
      if(this.Locations2[i+1]){
        let test = this.getpos(this.Locations2[i].lat,this.Locations2[i].long,this.Locations2[i+1].lat,this.Locations2[i+1].long);
      } 
    }

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
