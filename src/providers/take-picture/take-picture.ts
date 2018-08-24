import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
/*
  Generated class for the TakePictureProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class TakePictureProvider {

  constructor(private camera: Camera) {

    console.log('Hello ddff Provider');

  }

  takePicture() {
    let opcoes = {
    maximumImagesCount: 1,
    sourceType: 1,
    encodingType: this.camera.EncodingType.JPEG,
    destinationType: 0, // USE THIS TO RETURN BASE64 STRING
    correctOrientation: true
  };
return  this.camera.getPicture(opcoes);
}
}
