
import {NgModule, Injectable, Inject} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/share';
import { Observable }     from 'rxjs/Observable';


@Injectable()
export class DataService {
  result:any[];
  data:any[];
  options: RequestOptions;
  optionsToken: RequestOptions;
  token: string;

  constructor(@Inject(Http) private _http: Http) { 
    let headers: any = new Headers();
    //headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    //headers.append('Content-Type', 'application/json; charset=UTF-8');
    this.options = new RequestOptions({ headers: headers });
  }

  setToken(){
    this.token = localStorage.getItem('token');
       if(this.token){
         let headers: any = new Headers();
         headers.append('Content-Type', 'application/json');
         headers.append('Authorization', this.token);
         return this.optionsToken = new RequestOptions({ headers: headers });
       }
  } 

  getState() {
      return this._http.get('http://localhost:3000/state/', this.setToken())
      .map(result => this.result = result.json());
  }
  getSingleState(id){ 
    return this._http.get("http://localhost:3000/state/"+id, this.setToken())
      .map(result => this.result = result.json());
  }
  putState(object,id){
    return this._http.put('http://localhost:3000/state/'+id, object, this.setToken())
      .map( result => this.result = result.json());
  }
  addState(object){
    return this._http.post('http://localhost:3000/state/', object, this.setToken())
      .map( result => this.result = result.json());
  }
  deleteState(objID){
    return this._http.delete('http://localhost:3000/state/'+objID, this.setToken())
      .map( result => this.result = result.json());
  }

  getCountry() {
      return this._http.get('http://localhost:3000/country/', this.setToken())
      .map(result => this.result = result.json());
  }
  getSingleCountry(id){ 
    return this._http.get("http://localhost:3000/country/"+id, this.setToken())
      .map(result => this.result = result.json());
  }
  putCountry(object,id){
    return this._http.put('http://localhost:3000/country/'+id, object, this.setToken())
      .map( result => this.result = result.json());
  }

  getContinent() {
      return this._http.get('http://localhost:3000/continent/', this.setToken())
      .map(result => this.result = result.json());
  }
  getSingleContinent(id){ 
    return this._http.get("http://localhost:3000/continent/"+id, this.setToken())
      .map(result => this.result = result.json());
  }
  putContinent(object,id){
    return this._http.put('http://localhost:3000/continent/'+id, object, this.setToken())
      .map( result => this.result = result.json());
  }
  getUser() {
      return this._http.get('http://localhost:3000/user/', this.setToken())
      .map(result => this.result = result.json());
  }
  getSingleUser(id) { 
    return this._http.get("http://localhost:3000/user/"+id, this.setToken())
      .map(result => this.result = result.json());
  }

  postAuth(object){
     // console.log(object);
      return this._http.post('http://localhost:3000/authenticate/', object, this.options)
      .map( result => this.result = result.json());
  }

}

