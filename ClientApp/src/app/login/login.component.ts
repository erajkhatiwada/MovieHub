import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  invalidLogin: any;
  loggedInUserData: any;
  timer:any;
  constructor(private authService: AuthService, private router: Router, private http: HttpClient, private spinner: NgxSpinnerService) { }

  ngOnInit() {
   
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      //calling loading component when the username and password matches
      this.loading(); 
      this.invalidLogin = false;
      // this is to store the logged in user details
      let userNameCheck = this.model;
      var x = userNameCheck.username;
      this.http.get("http://localhost:5000/api/user/").subscribe(response=>{
          var userData = JSON.parse(JSON.stringify(response));
          var dataLength = userData.length;
          for(var i = 0; i < dataLength; i++){
            if(userData[i].userName == x ){
              this.loggedInUserData = response[i];
              console.log(this.loggedInUserData);
            }
          }
          console.log(response);
          localStorage.setItem("user",JSON.stringify(this.loggedInUserData));
      });
      // the user details goes till here

      console.log('logged in successfully');
      this.timer = setTimeout(() => {
        this.router.navigate(['/account']);
        location.reload();
    }, 2500);
    }, error => {
      console.log('Failed to login');
      this.invalidLogin = true;
    });
    
  }
  //loading method
  loading(){
    this.spinner.show();
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 5000);
  }

}
