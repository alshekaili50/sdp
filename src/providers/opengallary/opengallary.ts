import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker';

/*
  Generated class for the OpengallaryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OpengallaryProvider {
  options:any

  constructor(public imagePicker: ImagePicker) {
    console.log('Hello OpengallaryProvider Provider');
  }

  getImages(){
    this.options={
      maximumImagesCount:3
    }
    this.imagePicker.getPictures(this.options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
      }
    }, (err) => { });
  }

}
