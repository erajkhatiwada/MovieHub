import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //change this url to match your dotnet url
  baseUrl = 'http://localhost:5000/api/auth/';
  popularMovies = 'http://localhost:5000/api/';
  watchList = 'http://localhost:5000/api/';
  comment = 'http://localhost:5000/api/';
  user = 'http://localhost:5000/api/';
  movieId:any;
  userId: any;
  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }


  registerPopularMovies(model: any) {
    return this.http.post(this.popularMovies + 'popularmovies', model);
  }
 
  postWatchList(model: any) {
    return this.http.post(this.watchList + 'watchLists', model);
  }
  postComment(model: any) {
    return this.http.post(this.comment + 'comments', model);
  }
  
  setMovieId(x){
    this.movieId = x;
  }
  

}
