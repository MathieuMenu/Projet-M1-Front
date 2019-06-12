import { Component, OnInit } from '@angular/core';
import { MongoService } from './../service/mongo.service';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  check: any;
  profile: any;
  Locations: any;
  size1: any;

  constructor(private mongoservice: MongoService, public auth: AuthService) { }

  ngOnInit() {

  	if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
    
  	this.mongoservice.getLocationsByEmail(this.profile.nickname).subscribe(data => this.Locations = data.json())

    this.size1 = this.size(this.Locations);
  }

  delete = function(id){

    this.mongoservice.deleteLocation(id)
    .subscribe(data => { alert(data.data) ; this.ngOnInit();}, error => this.errorMessage = error)

  }

  trie = function(){
    this.check = true;

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
