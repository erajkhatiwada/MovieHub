import {Component,OnInit,Input} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  userName: any;
  firstName: any;
  lastName: any;
  userId: number;
  showAdmins: boolean;
  //watchlist for themoviedb
  watchList = [];
  watchListLength;
  watchListWithId;
  
  //watchlist for itunes
  itunesWatchlist=[];

  //watchlist of walmart
  walmartWatchlist = [];

  //get the data from photo-edit component
  pictureUrl: string;
  //delete watchlists
  movieId;
  timer: any;

  //*ngIf variables
  showItunes= false;
  showTheMovieDb= false;
  showWalmart = false;

  //*ngIf scrollDown
  showScrollButton:boolean;

  noProfilePicture:any;


  constructor(private router: Router, private http: HttpClient, private sanitizer: DomSanitizer) {
    this.getDetails();
    this.getWatchList();
    this.getPictures();
 
  }

  ngOnInit() {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.showScrollDown();
  }, 500);
    
  }

  Logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    localStorage.removeItem('pictureUrl');
    this.router.navigate(['/login']);
  }

  getDetails() {
    if (localStorage.getItem('user') != null) {
      console.log("We have data");
      let data = localStorage.getItem('user');
      var parData = JSON.parse(data);
      this.userName = parData.userName;
      this.userId = parData.id;
      this.firstName = parData.firstName;
      this.lastName = parData.lastName;
      //http://res.cloudinary.com/dbkyiybff/image/upload/v1541671725/rwnyqygo8fjpfcdmpnom.jpg%22
      //http://res.cloudinary.com/dbkyiybff/image/upload/v1541670967/y8cqzrdpvliuud92uih9.jpg%22
      if (this.userName == 'admin') {
        this.showAdmins = true;
      } else {
        this.showAdmins = false;
      }
      console.log(this.userName);
    }
  }

  goToAdminsPortal() {
    this.router.navigate(['/admins-portal'], {
      skipLocationChange: true
    });
  }

  getWatchList() {
    if (this.watchList != null) {
      this.watchList = [];
    }
    if (this.itunesWatchlist != null) {
      this.itunesWatchlist = [];
    }
    if (this.walmartWatchlist != null) {
      this.walmartWatchlist = [];
    }
    this.http.get('http://localhost:5000/api/user/' + this.userId)
      .subscribe(data => {
        var x = data;
        var y = x[0].watchList;
        this.watchListWithId = y;
        this.watchListLength = y.length;
        for (var m in y) {
          var iter = JSON.parse(y[m].movieName);
          //checking if there is themoviedb movie
          if(iter.title != undefined){
            this.watchList.push(iter);
            console.log(m);
          }
          //checking for itunes by one field
          if(iter.trackName != undefined){
            this.itunesWatchlist.push(iter);
          }
          //checking for walmart by one field
          if(iter.name != undefined){
            this.walmartWatchlist.push(iter);
          }
        }
  
        if(this.check(this.watchList) == true){
            this.showTheMovieDb = true;
        }
        if(this.check(this.itunesWatchlist) == true){
          this.showItunes = true;
        }
        if(this.check(this.walmartWatchlist) == true){
          this.showWalmart = true;
        }
        console.log(JSON.parse(JSON.stringify(this.watchList)));
        console.log(JSON.parse(JSON.stringify(this.itunesWatchlist)));
        console.log(JSON.parse(JSON.stringify(this.walmartWatchlist)));
      });
  }

  //check if the watchlists are empty
  check(arr=[]){
    if(arr.length != 0){
      return true;
    }
    return false;
  }

  passData(det) {
    this.router.navigate(['/watchlist-details'], {
      queryParams: det,
      skipLocationChange: true
    });
  }

  deleteWatchlist(x) {
    var stringX = JSON.stringify(x);
    this.http.get('http://localhost:5000/api/watchlists').subscribe(res => {
      var m = res;
      for (var a in m) {
        if (m[a].movieName == stringX && this.userId == m[a].user.id) {
          if (this.movieId != undefined) {
            this.movieId = undefined;
          }
          this.movieId = m[a].watchId;
          console.log(m[a]);
        }
      }
      console.log(this.movieId);
    });
  }
  //get picture of user
  getPictures(){
    this.http.get('http://localhost:5000/api/user/' + this.userId)
      .subscribe(data => {
        var x = data;
        var picturesArray = x[0].pictures;
        for(var i = 0; i<picturesArray.length; i++){
          if(picturesArray.length != 0){
            var n = picturesArray[picturesArray.length - 1].pictureUrl;
            this.pictureUrl = JSON.stringify(n);
          }
        }

        if(this.pictureUrl == undefined){
          this.noProfilePicture = true;
        }else{
          this.noProfilePicture = false;
        }
        console.log("Check", this.pictureUrl);
      });
  }

  confirmDel() {
    this.http.delete('http://localhost:5000/api/watchlists/' + this.movieId).subscribe(res => {
      console.log('deleted');
      this.getWatchList();
      this.showItunes = false;
      this.showItunes = false;
      this.showWalmart = false;
    });
  }

  pictureEdit() {
    this.router.navigate(['/photo-edit']);
  }

  scrollDown(){
    var elmnt = document.getElementById("content");
    elmnt.scrollIntoView();
    this.showScrollButton = false;
 }

 showScrollDown(){
   if(this.watchListLength > 3){
     this.showScrollButton = true;
   }
 }

}
