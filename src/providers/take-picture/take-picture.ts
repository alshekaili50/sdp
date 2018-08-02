import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
/*
  Generated class for the TakePictureProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class TakePictureProvider {

  constructor(public http: HttpClient,private camera: Camera) {

    console.log('Hello TakePictureProvider Provider');

  }

}
function takePicture() {
this.camera.getPicture().then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64 (DATA_URL):
 let base64Image = 'data:image/jpeg;base64,' + imageData;
}, (err) => {
 // Handle error
});
}
