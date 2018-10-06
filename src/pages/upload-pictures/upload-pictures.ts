import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import {TakePictureProvider} from '../../providers/take-picture/take-picture';
import {OpengallaryProvider} from '../../providers/opengallary/opengallary';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators,FormControl,ReactiveFormsModule,NgForm } from '@angular/forms';
import { ActionSheetController } from 'ionic-angular'
import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';
import { AlertController,ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {AngularFireAuth} from 'angularfire2/auth';
import{ImageServicesProvider} from '../../providers/image-services/image-services';
import {LoginPage} from '../login/login'

/**
 * Generated class for the NewUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-pictures',
  templateUrl: 'upload-pictures.html',
})
export class UploadPicturesPage {
  model: any = {};
  afList:any;
  res:any;
  loadProgress:any;
  steps:string[]=['progtrckr-todo'];
  uid:any;
  numberOfUploadedPics:any;
  imageDataArray:any[]=[];;
  takenPicture:number=0

  constructor(public navCtrl: NavController, public navParams: NavParams, public takePicture:TakePictureProvider,
  public actionSheetCtrl: ActionSheetController, public openGallary:OpengallaryProvider,  private vision: GoogleCloudVisionServiceProvider,
  private alert: AlertController,public loadingCtrl: LoadingController,public camera:Camera,
  private afauth:AngularFireAuth,private menu:MenuController,private imageServices:ImageServicesProvider,private toast:ToastController)


 {
   this.navParams.get('data');
   this.uid=this.afauth.auth.currentUser.uid;
   this.countNumberOfImages();
   this.takePhoto();
   this.menu.swipeEnable(false);


  // this.imageServices.getImagesOfUser(this.afauth.auth.currentUser.uid);

    }

    countNumberOfImages(){
      let loader=this.loadingCtrl.create({
        content:'Please wait',
        duration:5000
      })
      loader.present();
      this.imageServices.countImagesOfUser(this.afauth.auth.currentUser.uid).then(res=>{
        loader.dismiss();
        console.log(res);
        this.numberOfUploadedPics=res;
        this.checkIfVerified(res);

      })




    }
  checkIfVerified(numberOfUploadedPics){
    let n=0;
    for (let i = 0; i < this.steps.length; i++) {
      if(numberOfUploadedPics-n>0){
        this.steps[i]="progtrckr-done";
      }
      n++;

    }

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad NewUserPage');
}


showAlert(message) {
  let alert = this.alert.create({
    title: 'Error',
    subTitle: message,
    buttons: ['OK']
  });
  alert.present();
}
 takePhoto() {
  let opcoes =
     {
    maximumImagesCount: 1,
    sourceType: 1,
    encodingType: this.camera.EncodingType.JPEG,
    destinationType: 0, // USE THIS TO RETURN BASE64 STRING
    correctOrientation: true,
    cameraDirection: this.camera.Direction.FRONT
    };
    let length=0;
    let image:any;

    this.camera.getPicture(opcoes).then((imageData) => {
      image=imageData;
      this.takenPicture++;
      this.varyfyingImage(image);


    }
    ).catch(err=>{
     this.showAlert(err);

   })


    //  await


}

 varyfyingImage(imageData){
  let content="Verifying your photo !";
  const loader = this.loadingCtrl.create({
      content: content,
      duration: 10000
    })
    loader.present()

    this.vision.getLabels(imageData).subscribe(
             (val) => {

                        console.log("POST call successful value returned in body",
                        val.toString());
                        //val=JSON.stringify(val);
                        this.res=val

             },
             response => {
                 loader.dismiss();
                 console.log("POST call in error", response);
                 this.showAlert("Please check your network connectivity")
             },
             () => {
                loader.dismiss();
                 console.log("The POST observable is now completed.");
                 this.res=JSON.stringify(this.res);
                 length=this.res.length;
                 console.log('length',length);
                 if(length<5000&&length>=20){
                   console.log('image Veryfied')
                   this.uploadPhoto(imageData)

                     }
                else {

                  this.showAlert('One or more image is/are not valid');}





      })


;}



uploadPhoto(imageData){
  const loader = this.loadingCtrl.create({
      content: "Uploading your Pictures !",
      duration: 10000
    });

      this.imageServices.uploadImageOfUser(this.afauth.auth.currentUser.uid,imageData).subscribe(val=>{
        this.loadProgress = val.toFixed(2)
        if(this.loadProgress==100){
          this.countNumberOfImages();
          this.loadProgress=0;
          this.navCtrl.setRoot(LoginPage);
          this.toast.create({
            duration:3000,
            message:"Thank you for Registration"
          }).present();
        }
      }),err => {
      console.log(1,err);
      this.showAlert(err);
      }


  }

}
