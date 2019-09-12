import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../_services/auth.service';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  public show:boolean = false;
  public buttonName:any = 'Add';
  check:boolean;
  watchList = 'http://localhost:5000/api/';
  whenNotLogged:boolean;
  showAddButton:boolean;
  notification:boolean;
  watchlistError:any;

  //for watchList
  watchListJson : any;
  stringJSON: String;
  userId: number;

  //for itunes watchlist
  itunesJSON:any;
  stringItunesJSON:any;

  //forWalmartWatchlist
  walmartJSON:any;
  stringWalmartJSON:any;

  // movie details for themoviedb
  poster_path;
  original_language;
  popularity;
  original_title;
  release_date;
  title;
  vote_average;
  vote_count;
  overview;
  //

  //movie details for walmartApi
  salePrice;
  largeImage;
  shortDescription;
  productUrl;
  name;
  customerRating;
  offerType;
  msrp;

  //movie details for itunes
  artworkUrl100;
  trackPrice;
  trackRentalPrice;
  trackCensoredName;
  trackViewUrl;
  primaryGenreName;
  country;
  collectionHdPrice;
  previewUrl;
  longDescription;
  collectionViewUrl;

  constructor( private _router: ActivatedRoute, private sanitizer: DomSanitizer, private http: HttpClient, private authService: AuthService) {
    this.getDetails();
   }

  ngOnInit() {
    this.theMovieDb();
    this.walMart();
    this.iTunes();
   // this.getDetails();
    //this.getWatchList();
  }

  theMovieDb(){
    this._router.queryParams
    .subscribe(par => {
      var x = JSON.parse(JSON.stringify(par));
      this.watchListJson = x;
      this.original_language = x.original_language;
      this.original_title = x.original_title;
      this.overview = x.overview;
      this.popularity = x.popularity;
      this.release_date = x.release_date;
      this.title = x.title;
      this.vote_average = x.vote_average;
      this.vote_count = x.vote_count;
      this.poster_path = x.poster_path; 
    });
  }

  walMart(){
    this._router.queryParams
    .subscribe(par => {
      var x = JSON.parse(JSON.stringify(par));
      this.walmartJSON = x;
      this.salePrice = x.salePrice;
      this.largeImage = x.largeImage;
      this.shortDescription = x.shortDescription;
      this.productUrl = x.productUrl;
      this.name = x.name;
      this.customerRating = x.customerRating;
      this.offerType = x.offerType;
      this.msrp = x.msrp;
    });
  }

  iTunes(){
    this._router.queryParams
    .subscribe(par => {
      if(par != null){
        this.check = true;
      }
      else{
        this.check = false;
      }
      var x = JSON.parse(JSON.stringify(par));
      this.itunesJSON = x;
      this.artworkUrl100 = x.artworkUrl100;
      this.trackPrice = x.trackPrice;
      this.trackRentalPrice = x.trackRentalPrice;
      this.trackCensoredName = x.trackCensoredName;
      this.trackViewUrl = x.trackViewUrl;
      this.primaryGenreName = x.primaryGenreName;
      this.country = x.country;
      this.collectionHdPrice = x.collectionHdPrice;
      this.previewUrl = x.previewUrl;
      this.longDescription = x.longDescription;
      this.collectionViewUrl = x.collectionViewUrl;
    });
  }

  safeUrl(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.previewUrl);
  }

  toggle() {
    this.show = !this.show;
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Add";
  }
  //the movie db
  postToWatchList(){
    this.stringJSON = JSON.stringify(this.watchListJson);
    var data = {
      "userId": this.userId,
      "movieName": this.stringJSON
    };
    this.authService.postWatchList(data).subscribe(()=>{
      this.notification = true;
      this.showAddButton = false;
      setTimeout(() => {
        this.notification = undefined;
    }, 2500);
    },error =>{
      if(this.watchlistError != null){
        this.watchlistError = undefined;
      }
      this.watchlistError = error.error;
      this.showAddButton = false;
      setTimeout(() => {
        this.watchlistError = undefined;
    }, 2500);
      console.log(error.error);
    });
  }

  //watchlist itunes

  itunesWatchlist(){
    this.stringItunesJSON = JSON.stringify(this.itunesJSON);
    var data = {
      "userId": this.userId,
      "movieName": this.stringItunesJSON
    };
    this.authService.postWatchList(data).subscribe(()=>{
      this.notification = true;
      this.showAddButton =false;
      console.log("Itunes watchlist posted");
      setTimeout(() => {
        this.notification = undefined;
    }, 2500);
    },error =>{
      if(this.watchlistError != null){
        this.watchlistError = undefined;
      }
      this.watchlistError = error.error;
      this.showAddButton = false;
      setTimeout(() => {
        this.watchlistError = undefined;
    }, 2500);
      console.log(error.error);
    });
  }

  walmartWatchlist(){
    this.stringWalmartJSON = JSON.stringify(this.walmartJSON);
    var data = {
      "userId": this.userId,
      "movieName": this.stringWalmartJSON
    };
    this.authService.postWatchList(data).subscribe(()=>{
      this.notification = true;
      this.showAddButton =false;
      console.log("Itunes watchlist posted");
      setTimeout(() => {
        this.notification = undefined;
    }, 2500);
    },error =>{
      if(this.watchlistError != null){
        this.watchlistError = undefined;
      }
      this.watchlistError = error.error;
      this.showAddButton = false;
      setTimeout(() => {
        this.watchlistError = undefined;
    }, 2500);
      console.log(error.error);
    });
  }

  getDetails(){
    if(localStorage.getItem('user') != null){
      this.showAddButton = true;
      this.whenNotLogged = true;
      console.log("We have data");
      let data = localStorage.getItem('user');
      var parData = JSON.parse(data);
      this.userId = parData.id;
      console.log(this.userId);
    //  this.getWatchList();
    }else{
      this.whenNotLogged = false;
    }
  }

  // getWatchList() {
  //   this.http.get('http://localhost:5000/api/user/' + this.userId)
  //     .subscribe(data => {

  //       var x = data;
  //       var y = x[0].watchList;
  //       console.log(y);
  //       for (var m in y) {
  //         var iter = JSON.parse(y[m].movieName);
  //         if(iter == this.itunesJSON){
  //           window.alert('found');
  //         }
  //         else if(iter.title == this.title){
  //           window.alert('the movie db');
  //         }
  //         else if(iter.name == this.name){
  //           window.alert('walmart');
  //         }
  //         console.log(iter);
  //       }
        
  //     });
  // }
      
}


