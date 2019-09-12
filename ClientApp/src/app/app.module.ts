import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { AuthService } from '../_services/auth.service';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './auth/auth.guard';
import { FooterComponent } from './footer/footer.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { CountUpModule } from 'countup.js-angular2';
import { AdminsPortalComponent } from './admins-portal/admins-portal.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { WatchlistDetailsComponent } from './watchlist-details/watchlist-details.component';
import { PhotoEditComponent } from './photo-edit/photo-edit.component';
import { FileUploadModule } from 'ng2-file-upload';
import { CommentComponent } from './comment/comment.component';
import { CompareValidatorDirective } from './Validator/compare-validator.directive';
const appRoutes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'account', component: AccountComponent, canActivate:[AuthGuard]  },
  { path: 'movie-details', component: MovieDetailsComponent },
  { path: 'admins-portal', component: AdminsPortalComponent, canActivate:[AuthGuard] },
  { path: 'watchlist-details', component: WatchlistDetailsComponent, canActivate:[AuthGuard] },
  { path: 'photo-edit', component: PhotoEditComponent, canActivate:[AuthGuard]},
  { path: 'comment', component: CommentComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    NavBarComponent,
    MovieItemComponent,
    AccountComponent,
    FooterComponent,
    MovieDetailsComponent,
    AdminsPortalComponent,
    WatchlistDetailsComponent,
    PhotoEditComponent,
    CommentComponent,
    CompareValidatorDirective
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CountUpModule,
    NgxSpinnerModule,
    FileUploadModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )

    // RouterModule.forRoot(
    //   appRoutes,
    //   { enableTracing: true }
    // )



  ],
  providers: [
    AuthService, AuthGuard
  ],
  bootstrap: [
    AppComponent,
  ]
})

export class AppModule { }


