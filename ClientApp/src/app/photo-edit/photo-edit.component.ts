import { Component, OnInit} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent implements OnInit {
  userId: any;
   uploader:FileUploader;
   hasBaseDropZoneOver = false;
   hasAnotherDropZoneOver = false;
   baseUrl = 'http://localhost:5000/api/'
   //holds the pictureUrl from cloudinary
   pictureUrl: string;

   queryShow:any;
 
  constructor(private router: Router) { }

  ngOnInit() {
    this.getDetails();
    this.initializeUploader();
  }

   fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.userId +'/pictures',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      removeAfterUpload: true,
    });
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false;};
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      const res = JSON.parse(response);
      //pass this url to account component
      this.pictureUrl = res.pictureUrl;
      localStorage.setItem("pictureUrl", JSON.stringify(this.pictureUrl)); 
      console.log(localStorage.getItem('pictureUrl'));
      this.router.navigate(['/account']);
      window.location.reload();
    }

    
  }

  //get the details of the users
  getDetails(){
    if(localStorage.getItem('user') != null){
      console.log("We have data");
      let data = localStorage.getItem('user');
      var parData = JSON.parse(data);
      this.userId = parData.id;
    }
  }

}
