import { Component, OnInit } from '@angular/core';
//import { AuthService } from '../../_services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  session : boolean;
  constructor(private router: Router) { }

  ngOnInit() {
    this.check();
  }

  Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    location.reload();
    
  }

  check(){
    if(localStorage.getItem('token') != null) {
      this.session = true;
    }

    else{
      this.session = false;
    }
  }

}
