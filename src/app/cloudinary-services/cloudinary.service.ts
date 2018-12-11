import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private cloudName = "wekplace";
  private APIKey = "195489455439647";
  private APISecret = "S4FpE_aBD1on9i5yaQ-LXAzrAs4";
  private CLOUDINARY_URL="cloudinary://195489455439647:S4FpE_aBD1on9i5yaQ-LXAzrAs4@wekplace";
  private CLOUDINARY_PRESET="nvefdbpm";
  private imageUploadURL="https://api.cloudinary.com/v1_1/wekplace/image/upload";

  constructor(private http: HttpClient) { }

  upload(file: File) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.CLOUDINARY_PRESET);
    this.http.post(this.imageUploadURL, formData, httpOptions)
      .subscribe((image) => console.log(image),
                (error) => console.log(error));
  }
}
