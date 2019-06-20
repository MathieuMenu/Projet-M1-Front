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
  //Distance: any = [];
  Duree:any = [];
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
    
    this.directionsService.route({origin:originlat+","+originlong, destination:destinationlat+","+destinationlong, travelMode:google.maps.TravelMode.DRIVING}, (result, status) => {
      console.log(result);
      //var distance = (result.routes[0].legs[0].distance.text);
      var duree = (result.routes[0].legs[0].duration.text);
      //this.distanceadd(distance);
      this.dureeadd(duree);
    });
    
  }

  // distanceadd(test){
  //   this.Distance.push(test);
  // }

  dureeadd(test){
    this.Duree.push(test);
  }

  delete = function(id){

    this.mongoservice.deleteLocation(id)
    .subscribe(data => { alert(data.data) ; this.ngOnInit();}, error => this.errorMessage = error)

  }

  trie = function(){

    this.Locations = this.Locations2

    let shuffled = this.Locations
  .map((a) => ({sort: Math.random(), value: a}))
  .sort((a, b) => a.sort - b.sort)
  .map((a) => a.value)
   
    this.Locations = shuffled;

    // this.Distance = [];
    this.Duree = [];

    for(let i = 0; i < this.size(this.Locations);i=i+2){
      if(this.Locations[i+1]){
        this.getpos(this.Locations[i].lat,this.Locations[i].long,this.Locations[i+1].lat,this.Locations[i+1].long);
      } 
    }

    this.check = true;

  }

  size = function(obj) {
    var size = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  }

}
