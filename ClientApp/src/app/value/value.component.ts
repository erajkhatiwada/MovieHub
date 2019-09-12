import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../_services/auth.service';
@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
  data: any; //api data
  jsonPopularMovie: any;
  listPopularMoives: any;
  value = ''; //search value
  movie_list: any;

  walmartMovies:any;
  selectedOption: any;
  printedOption: string;
  movie_database: any;

  check1:boolean;
  check2:boolean;
  check3:boolean; //trailers section
  check4:boolean; // itunes

  itunesMovies:any;

  trailers:any;
  
  // options = [
  //   { name: "Choose a Category", value: 0 },
  //   { name: "General Discription", value: 1 },
  //   { name: "Buy or Rental", value: 2 },
  //   { name: "Trailers", value: 3 }
  // ]
  options = ["Choose a Category","General Discription","Buy or Rental","Trailers"];

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
    this.onEnter(this.value);
    this.getMovieDatabase();
    this.print();
    this.selectedOption = this.options[0];
  }

  ngOnInit() {
    this.popularMovies();
  }

  print() {
    console.log(this.selectedOption);
    this.printedOption = this.selectedOption;
    this.onEnter(this.value);
    console.log("My input: ", this.selectedOption);
  }

  getValues() {
    this.http.get('https://api.themoviedb.org/3/search/movie?api_key=0c59cd271cda403e2120979633303c38&query=' + this.value).subscribe(response => {
      this.data = response;
      console.log(this.data);
      this.movie_list = this.data.results;
      console.log(this.movie_list);
    }, error => {
      console.log(error);
    });
  }

  getMoviesFromWalmart(){
    this.http.get('http://api.walmartlabs.com/v1/search?apiKey=y8hkhc9hf962dtx6p8n9mzp2&query='+this.value+'&categoryId=4096&sort=price&order=asc')
    .subscribe(response => {
      this.data = response;
      var walmartJSON = this.data;
      this.walmartMovies = walmartJSON.items;
      console.log(this.walmartMovies);  
    }, error => {
      console.log(error);
    }); 
  }

  getMoviesFromItunes(){
    this.http.get('https://itunes.apple.com/search?term='+this.value+'&entity=movie&limit=10')
    .subscribe(response => {
      var itunes = JSON.parse(JSON.stringify(response));
      this.itunesMovies = itunes.results;
      console.log(this.itunesMovies);
    }, error => {
      console.log(error);
    }); 
  }

  getMovieDatabase(){
    this.http.get("http://localhost:5000/api/popularmovies").subscribe(result => {
      this.movie_database = result;
      console.log(this.movie_database);
    });
  }

  popularMovies() {
    this.http.get("https://api.themoviedb.org/3/trending/movie/day?api_key=0c59cd271cda403e2120979633303c38").subscribe(res => {
      this.jsonPopularMovie = res;
      this.listPopularMoives = this.jsonPopularMovie.results;
      console.log(this.listPopularMoives);
    });
  }

  passData(vid){
    this.router.navigate(['/movie-details'], { queryParams: vid, skipLocationChange: true});
  }

  
  passWalmartData(wal){
    this.router.navigate(['/movie-details'], { queryParams: wal, skipLocationChange: true});
  }

  passItunesData(itunes){
    this.router.navigate(['/movie-details'], { queryParams: itunes, skipLocationChange: true});
  }

  onEnter(value: string) {
    this.value = value;
    if(this.selectedOption == 'General Discription'){
      this.check1 = true;
      this.check2 = false;
      this.check3 = false;
      this.check4 = false;
      this.getValues();
      
    }
    else if(this.selectedOption == 'Buy or Rental'){
      this.check2 = true;
      this.check1 = false;
      this.check3 = false;
      this.check4 = true;
      this.getMoviesFromWalmart();
      this.getMoviesFromItunes();
    }
    else if(this.selectedOption == 'Trailers'){
      this.check2 = false;
      this.check1 = false;
      this.check3 = true;
      this.check4 = false;
      this.trailer();
    }
    if(this.selectedOption == 'Choose a Category'){
      this.check4 = true;
      this.check2 = false;
      this.check1 = false;
      this.check3 = false;

      this.getMoviesFromItunes();
    }
    
    console.log(this.value);
  }

  setMovieId(x){
    console.log(x);
    var id = x.id;
    console.log(id);
    this.authService.setMovieId(id);
    
    setTimeout(() => {
      this.router.navigate(['/comment']);
  }, 500);
  }

  trailer(){
    this.http.get('https://itunes.apple.com/search?term='+this.value+'&entity=movie&limit=8')
    .subscribe(response => {
      var itunes = JSON.parse(JSON.stringify(response));
      this.trailers = itunes.results;
      console.log(this.trailers);
    }, error => {
      console.log(error);
    }); 
  }

}
