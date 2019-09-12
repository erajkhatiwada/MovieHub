import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  popularMovieId:any;
  popularJson:any;
  commentsArray= [];
  value = '';
  userId:number;
  userName:any;
  deleteCommentId:number;
  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {
    this.onEnter(this.value);
    this.getDetails();
   }

  ngOnInit() {
    this.getMoviesFromDatabaseId();
  }

  getMoviesFromDatabaseId(){
    if(this.commentsArray != null){
      this.commentsArray = [];
    }
    this.popularMovieId = this.authService.movieId;
    this.http.get('http://localhost:5000/api/popularmovies/'+this.popularMovieId).subscribe(res => {
      this.popularJson = res;
      var x = this.popularJson[0].comments;
      console.log(this.popularJson);
      for(var o in x){
        var z = x[o].user;
        var e = z["userName"]; //username
        //for admins
        if(this.userName == 'admin'){
          var data = {
            "comment": x[o].comment,
            "commentId": x[o].commentId,
            "username": e,
            "button": "show"
          };
        }else{
          //for other users
          if(e == this.userName){
            var data = {
              "comment": x[o].comment,
              "commentId": x[o].commentId,
              "username": e,
              "button": "show"
            };
          }
          else{
            var data = {
            "comment": x[o].comment,
            "commentId": x[o].commentId,
            "username": e,
            "button": ""
          };
        }
        }
        this.commentsArray.push(data);
      }
     console.log(JSON.stringify(this.commentsArray));
    });
  }

  onEnter(value: string) {
    this.value = value;
  }

  comment(){
    var data = {
      "userId": this.userId,
      "movieId": this.popularMovieId,
      "comment": this.value
    }
    console.log(data);
    if(this.value != ""){
      this.authService.postComment(data).subscribe(res => {
        console.log("Commenst posted");
        this.getMoviesFromDatabaseId();
        this.value = '';
      });
    }
  }

  loginPage(){
    this.router.navigate(['/login']);
  }

  getDetails(){
    if(localStorage.getItem('user') != null){
      console.log("We have data");
      let data = localStorage.getItem('user');
      var parData = JSON.parse(data);
      this.userId = parData.id;
      this.userName = parData.userName;
    }
  }

  deleteComment(x){
    this.deleteCommentId = x.commentId;
  }

  confirmDelete(){
    this.http.delete('http://localhost:5000/api/comments/'+this.deleteCommentId).subscribe(result =>{
        console.log('deleted');
        this.getMoviesFromDatabaseId();
    });
  }

}
