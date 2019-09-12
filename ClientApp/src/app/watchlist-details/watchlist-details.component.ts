import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-watchlist-details',
  templateUrl: './watchlist-details.component.html',
  styleUrls: ['./watchlist-details.component.css']
})
export class WatchlistDetailsComponent implements OnInit {
  watchListJson;
  poster_path;
  original_language;
  popularity;
  original_title;
  release_date;
  title;
  vote_average;
  vote_count;
  overview;

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
  constructor(private _router: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.theMovieDb();
    this.walMart();
    this.iTunes();
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
      var x = JSON.parse(JSON.stringify(par));
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

}
