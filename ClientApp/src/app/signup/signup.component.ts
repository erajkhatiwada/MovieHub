import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model: any = {};
  checkUsername: any; // to check if username exists or not
  timer: any; // to route to login page with the given time frame
  message = '';
  anotherMessage = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  show: any;

  constructor(private authService: AuthService, private router: Router) {
  
   }

  ngOnInit() {
    
  }

  register() {
    // if(this.checkpassword()===true){
    this.authService.register(this.model).subscribe(() =>{ 
      {
      console.log('registration successful');
      this.message = 'Thank you for creating an account!';
      this.anotherMessage = 'Registered Successfully';
      this.timer = setTimeout(() => {
        this.router.navigate(['/login']);
    }, 1500);
  }

    }, error => {
      var err = error;
      var check_username = err.error;
      this.checkUsername = check_username;
      setTimeout(() => {
        this.checkUsername = undefined;
    }, 3000);
      console.log(error);
    });
  // }
  }
  checkpassword(): boolean{
  if(this.model.password!=this.model.confirmpassword)
  return false;
  else
  return true;
}
 
}
