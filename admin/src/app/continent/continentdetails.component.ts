import { Component, ViewEncapsulation, NgModule, Pipe, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { DataService } from './../data.service';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'continentdetails',
  templateUrl: './continentdetails.component.html'
})

export class ContinentdetailsComponent implements OnInit{
  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  description:string = '';
  name:string = '';
  area:string = '';
  country_count:string = '';
  continent_key:string = '';
  titleAlert:string = 'This field is required';

  continents: any;
  resultContinent: any;
  continentsID:number;

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
          'area' : [null, Validators.required],
          'country_count' : [null, Validators.required],
          'continent_key' : [null, Validators.required],
          'description' : [null],
          'validate' : ''
        });
  };
  ngOnInit() {
    this.rForm.get('validate').valueChanges.subscribe(

      (validate) => {

          if (validate == '1') {
              this.rForm.get('name').setValidators([Validators.required, Validators.minLength(3)]);
              this.titleAlert = 'You need to specify at least 3 characters';
          } else {
              this.rForm.get('name').setValidators(Validators.required);
          }
          this.rForm.get('name').updateValueAndValidity();

      });

  	  //Get Continent
      this.route.params.subscribe((params: Params) => {
        this.continentsID = params['id']; 
      });
      this.service.getSingleContinent(this.continentsID)
           //.subscribe(res => this.users = res );
        .subscribe(res => {
           this.continents = res;
           this.rForm.controls['name'].patchValue(this.continents.name);
           this.rForm.controls['area'].patchValue(this.continents.area);
           this.rForm.controls['country_count'].patchValue(this.continents.country_count);
           this.rForm.controls['description'].patchValue(this.continents.description);
           this.rForm.controls['continent_key'].patchValue(this.continents.continent_key);
           },
           error => {
              console.log(error);
           }
        );
        
  }

  addPost(post) {
    this.name = post.name;
    this.area = post.area;
    this.country_count = post.country_count;
    this.description = post.description;
    this.continent_key = post.continent_key;
    
    let obj={
      name : post.name,
      area : post.area,
      country_count : post.country_count,
      description : post.description,
      continent_key : post.continent_key
    };

    this.service.putContinent( JSON.stringify(obj), this.continentsID )
    .subscribe(res =>{ this.resultContinentFn(this.resultContinent = res ) });   
    
  }

  private resultContinentFn(res)
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
