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

  delete(id){
    this.mongoservice.deleteLocation(id).subscribe(data => this.ngOnInit())
  }

}
