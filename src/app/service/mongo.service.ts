import { Injectable } from '@angular/core';
import { Http,Response,Headers,RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class MongoService {

	constructor(private http: Http){}

	saveLocation(location){
		return this.http.post('https://mmback.herokuapp.com/api/SaveLocation/',location)
		.map((response: Response) => response.json())
	}

	getLocations(){
		return this.http.get('https://mmback.herokuapp.com/api/getLocations/')
		//.map((response: Response) => response.json())
	}

	getLocationsByEmail(email){
		return this.http.get('https://mmback.herokuapp.com/api/getLocationsByEmail/',{params: { email: email }})
		//.map((response: Response) => response.json())
	}

	deleteLocation(id){
		return this.http.post('https://mmback.herokuapp.com/api/deleteLocationsById/',{params: { 'id': id }})
		.map((response: Response) => response.json())
	}
}