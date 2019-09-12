import {Component,OnInit} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import { HttpClient} from '@angular/common/http';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { AuthGuard } from '../auth/auth.guard';
@Component({
  selector: 'app-admins-portal',
  templateUrl: './admins-portal.component.html',
  styleUrls: ['./admins-portal.component.css']
})
export class AdminsPortalComponent implements OnInit {
  public showMovies: boolean = true;
  public showForm: boolean = false;
  public display: boolean = false;  
  public edits: boolean = false;  
  public buttonName: any = 'Add Movies';
  public buttonName2: any = 'Register';
  public buttonName3: any = '';
  public buttonName4: any = '';
  specId:number;
  idValue: any;
  confirmDelete = false;
  userNumber: any;
  userData: any;
  userId: any;
  registerNotification: any;
  model: any = {};
  movie_database;
  spmovie_database;
  spId: number = 0;
  constructor(private authService: AuthService, private auth: AuthGuard, private http: HttpClient) {

  }

  ngOnInit() {
    this.getMovieDatabase();
    this.getUserNumber();
   
  }

  register() {
    this.authService.registerPopularMovies(this.model).subscribe(() => {
      console.log('registration successful');
      this.registerNotification = true;
      this.getMovieDatabase();
      this.toggle();
      setTimeout(() => {
        this.registerNotification = undefined;
    }, 2500);
    }, error => {
      console.log(error);
    });
  }

  getMovieDatabase() {
    this.http.get("http://localhost:5000/api/popularmovies").subscribe(result => {
      this.movie_database = result;
      console.log(this.movie_database);
    });
  }
  getspMovieDatabase(id) {
    this.spId = id;
    this.http.get("http://localhost:5000/api/popularmovies/" +this.spId).subscribe(result => {
      this.spmovie_database = result;
      console.log(this.spmovie_database);
      console.log(this.spmovie_database[0].name);
      this.fillForm();
    });
   
  }
  fillForm(){
    this.model.name = this.spmovie_database[0].name;
    this.model.imageUrl= this.spmovie_database[0].imageUrl;
    this.model.firstSource= this.spmovie_database[0].firstSource;
    this.model.firstLink= this.spmovie_database[0].firstLink;
    this.model.firstPrice= this.spmovie_database[0].firstPrice;
    this.model.secondSource= this.spmovie_database[0].secondSource;
    this.model.secondLink= this.spmovie_database[0].secondLink;
    this.model.secondPrice= this.spmovie_database[0].secondPrice;
    this.spId = 0;
  
  }


  getUserNumber() {
    this.http.get("http://localhost:5000/api/user").subscribe(result => {
      this.userData = result;
      console.log(this.userData);
      this.userNumber = this.userData.length;
    });
  }

  toggle() {
    this.showMovies = !this.showMovies;
    this.buttonName = "Add Movies";
    if (this.showMovies = true){
      if(this.showForm){
        this.showForm = !this.showForm;
      }
      if(this.display){
        this.display = !this.display;
      }
     }
      else
      {
      this.showForm != this.showForm;
      }
  }
  toggle2() {
    this.showForm = !this.showForm;
    if (this.showForm){
      this.buttonName = "Hide";
      if(this.display){
        this.display = !this.display;
      }
      if(this.showMovies){
        this.showMovies = !this.showMovies;   
      }
      if(this.edits){
        this.buttonName2 = "Edit";
      }
     }

     else
      {
      this.buttonName2 = "Register";
      this.buttonName = "Add Movies";
      }
  }
  toggle3() {
    this.display = !this.display;
     if (this.display = true){
      this.buttonName = "Add Movies"; 
      if(this.showForm){
        this.showForm = !this.showForm;
      }
      if(this.showMovies){
        this.showMovies = !this.showMovies;
      }
     }
    
    
       
  }
  deleteMovies(id) {
    this.idValue = id;
    console.log(id);
    this.buttonName4 = "Movie";
    this.buttonName3 = "confirmDel";
  }
  editMovies(id){
    this.idValue = id;
    console.log(id);
    this.buttonName2 = "Edit";
    
  }
  deleteUser(id){
    this.userId = id;
    console.log(id);
    this.buttonName4 = "User";
    this.buttonName3 = "confirmDeleteUser";
  }
  
  
  confirmDel() {
    this.http.delete("http://localhost:5000/api/popularmovies/" + this.idValue).subscribe(result => {
      console.log("Deleted");
      this.getMovieDatabase();
    })
    console.log("clicked");
  }
  confirmDeleteUser() {
    this.http.delete("http://localhost:5000/api/users/" + this.userId).subscribe(result => {
      console.log("Deleted");
      this.getUserNumber();
    })
    console.log("clicked");
  }
  edit(){
    this.edits =! this.edits;
    this.confirmDel();
    this.authService.registerPopularMovies(this.model).subscribe(() => {
      console.log('registration successful');
      this.registerNotification = true;
      this.getMovieDatabase();
      this.toggle();
      setTimeout(() => {
        this.registerNotification = undefined;
    }, 2500);
    }, error => {
      console.log(error);
    });
  }
  submit(){
    if(this.buttonName2==="Register")
    this.register();
    else
    this.edit();
  }
  delete(){
    if(this.buttonName3==="confirmDeleteUser")
    this.confirmDeleteUser();
    else
    this.confirmDel();
  }
}
