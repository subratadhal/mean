import { Component, ViewEncapsulation, NgModule, Pipe, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { DataService } from './../data.service';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'statedetails',
  templateUrl: './statedetails.component.html'
})

export class StatedetailsComponent implements OnInit{
  rForm: FormGroup;
  post:any;                     // A property for our submitted form

  name:string = '';
  area:string = '';
  capital:string = '';
  districts:string = '';
  image:string = '';
  density:string = '';
  sex_ratio:string = '';
  languages:string = '';
  map:string = '';
  latitude:string = '';
  longitude:string = '';
  continent_key:string = '';
  country_key:string = '';
  state_key:string = '';
  description:string = '';
  titleAlert:string = 'This field is required';

  state: any;
  resultState: any;
  stateID:number;

  successMessage:any;
  errorMessage:any;

  constructor(
    private service:DataService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private fb: FormBuilder) 
  {
    this.createForm();
  }
  createForm() {
        this.rForm = this.fb.group({
          'name' : [null, Validators.required],
          'area' : [null],
          'capital' : [null],
          'districts' : [null],
          'image' : [null],
          'density' : [null],
          'sex_ratio' : [null],
          'languages' : [null],
          'map' : [null],
          'latitude' : [null],
          'longitude' : [null],
          'continent_key' : [null, Validators.required],
          'country_key' : [null, Validators.required],
          'state_key' : [null, Validators.required],
          'description' : [null],
          'validate' : ''
        });
  };
  ngOnInit() {
   	  //Get Continent
      this.route.params.subscribe((params: Params) => {
        this.stateID = params['id']; 
      });
      this.service.getSingleState(this.stateID)
        .subscribe(res => {
           this.state = res;
           this.rForm.controls['name'].patchValue(this.state.name);
           this.rForm.controls['area'].patchValue(this.state.area);
           this.rForm.controls['capital'].patchValue(this.state.capital);
           this.rForm.controls['districts'].patchValue(this.state.districts);
           this.rForm.controls['image'].patchValue(this.state.image);
           this.rForm.controls['density'].patchValue(this.state.density);
           this.rForm.controls['sex_ratio'].patchValue(this.state.sex_ratio);
           this.rForm.controls['languages'].patchValue(this.state.languages);
           this.rForm.controls['map'].patchValue(this.state.map);
           this.rForm.controls['latitude'].patchValue(this.state.latitude);
           this.rForm.controls['longitude'].patchValue(this.state.longitude);
           this.rForm.controls['description'].patchValue(this.state.description);
           this.rForm.controls['continent_key'].patchValue(this.state.continent_key);
           this.rForm.controls['country_key'].patchValue(this.state.country_key);
           this.rForm.controls['state_key'].patchValue(this.state.state_key);
           },
           error => {
              console.log(error);
           }
        );
        
  }

  addPost(post) {
    this.name = post.name;
    this.area = post.area;
    this.capital = post.capital;
    this.districts = post.districts;
    this.image = post.image;
    this.density = post.density;
    this.sex_ratio = post.sex_ratio;
    this.languages = post.languages;
    this.map = post.map;
    this.latitude = post.latitude;
    this.longitude = post.longitude;
    this.description = post.description;
    this.continent_key = post.continent_key;
    this.country_key = post.country_key;
    this.state_key = post.state_key;
    
    let obj={
      name : post.name,
      area : post.area,
      capital : post.capital,
      districts : post.districts,
      image : post.image,
      density : post.density,
      sex_ratio : post.sex_ratio,
      languages : post.languages,
      map : post.map,
      latitude : post.latitude,
      longitude : post.longitude,
      description : post.description,
      continent_key : post.continent_key,
      country_key : post.country_key,
      state_key : post.state_key
    };

    this.service.putState( JSON.stringify(obj), this.stateID )
    .subscribe(res =>{ this.resultStateFn(this.resultState = res ) });   
    
  }

  private resultStateFn(res)
    {
        if(res.success == false){
          this.errorMessage = res.message;
        }else{
          this.successMessage = res.message;
        }
        var interval = setTimeout(() => {
          this.successMessage = '';
          this.errorMessage = '';
        }, 5000);
    }


}
