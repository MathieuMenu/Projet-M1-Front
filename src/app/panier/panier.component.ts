import { Component, OnInit } from '@angular/core';
import { MongoService } from './../service/mongo.service';

@Component({
  selector: 'panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  Locations: any;

  constructor(private mongoservice: MongoService) { }

  ngOnInit() {
  	this.mongoservice.getLocations().subscribe(data => this.Locations = data)
  }

}
