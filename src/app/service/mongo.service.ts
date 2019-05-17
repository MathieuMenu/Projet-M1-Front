import { Injectable } from '@angular/core';
import { Http,Response,Headers,RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class MongoService {

	constructor(private http: Http){}

	saveLocation(location){
		return this.http.post('/proxy/api/SaveLocation/',location)
		.map((response: Response) => response.json())
	}

	getLocations(){
		return this.http.get('https://mmback.herokuapp.com/api/getLocations/')
		.map((response: Response) => response.json())
	}
}