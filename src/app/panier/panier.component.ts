import { Component, OnInit } from '@angular/core';
import { MongoService } from './../service/mongo.service';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  profile: any;
  Locations: any;

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
  }

  delete = function(id){

    this.mongoservice.deleteLocation(id)
    .subscribe(data => { alert(data.data) ; this.ngOnInit();}, error => this.errorMessage = error)

  }

  trie = function(){
    var Locations2 = this.Locations;

    this.shuffle(Locations2);

    console.log(Locations2);
  }

  randomInt = function (min, max) {
    return (min + Math.floor ((max - min + 1) * Math.random ()));
  }

  shuffle = function (items) {
      var i, j;
      var item;
      if ((!items.length) || (items.length == 1)){
        return;
      }
      for (i = items.length - 1; i != 0; i --) {
          j = this.randomInt (0, i);
          item = items[j];
          items[j] = items[i];
          items[i] = item;
      }
  }

}
