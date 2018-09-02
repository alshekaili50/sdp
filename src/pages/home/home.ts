import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import{ImageServicesProvider} from '../../providers/image-services/image-services';
import {AngularFireAuth} from 'angularfire2/auth';
import {UploadPicturesPage} from '../upload-pictures/upload-pictures';
import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isActive=false;
  name:string;

  constructor(private loadingCtrl:LoadingController,public navCtrl: NavController,private imageServices:ImageServicesProvider,private afuath:AngularFireAuth) {
    this.name=this.afuath.auth.currentUser.displayName;
  let loader=this.loadingCtrl.create({
      content:"Please Wait",
      duration:5000

    });
    loader.present();
    this.imageServices.countImagesOfUser(this.afuath.auth.currentUser.uid).then(res=>{
      console.log(res);
      loader.dismiss();
      if(res>=5){
        this.isActive=true;
      }else{
        this.isActive=false;
      }
    })





  }
  uploadPage(){
    this.navCtrl.setRoot(UploadPicturesPage);
  }

}
