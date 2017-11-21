import { Component, ViewEncapsulation, NgModule, Pipe, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { DataService } from './../data.service';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'countrydetails',
  templateUrl: './countrydetails.component.html'
})

export class CountrydetailsComponent implements OnInit{
  rForm: FormGroup;
  post:any;                     // A property for our submitted form

  name:string = '';
  area:string = '';
  image:string = '';
  flag:string = '';
  capital:string = '';
  continent_key:string = '';
  country_key:string = '';
  description:string = '';
  titleAlert:string = 'This field is required';

  country: any;
  resultCountry: any;
  countryID:number;

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
          'image' : [null],
          'flag' : [null],
          'capital' : [null],
          'continent_key' : [null, Validators.required],
          'country_key' : [null, Validators.required],
          'description' : [null],
          'validate' : ''
        });
  };
  ngOnInit() {
   	  //Get Continent
      this.route.params.subscribe((params: Params) => {
        this.countryID = params['id']; 
      });
      this.service.getSingleCountry(this.countryID)
        .subscribe(res => {
           this.country = res;
           this.rForm.controls['name'].patchValue(this.country.name);
           this.rForm.controls['area'].patchValue(this.country.area);
           this.rForm.controls['image'].patchValue(this.country.image);
           this.rForm.controls['flag'].patchValue(this.country.flag);
           this.rForm.controls['capital'].patchValue(this.country.capital);
           this.rForm.controls['description'].patchValue(this.country.description);
           this.rForm.controls['continent_key'].patchValue(this.country.continent_key);
           this.rForm.controls['country_key'].patchValue(this.country.country_key);
           },
           error => {
              console.log(error);
           }
        );
        
  }

  addPost(post) {
    this.name = post.name;
    this.area = post.area;
    this.image = post.image;
    this.flag = post.flag;
    this.capital = post.capital;
    this.description = post.description;
    this.continent_key = post.continent_key;
    this.country_key = post.country_key;
    
    let obj={
      name : post.name,
      area : post.area,
      image : post.image,
      flag : post.flag,
      capital : post.capital,
      description : post.description,
      continent_key : post.continent_key,
      country_key : post.country_key
    };

    this.service.putCountry( JSON.stringify(obj), this.countryID )
    .subscribe(res =>{ this.resultContinentFn(this.resultCountry = res ) });   
    
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
