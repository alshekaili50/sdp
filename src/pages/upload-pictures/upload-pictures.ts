import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TakePictureProvider} from '../../providers/take-picture/take-picture';
import {OpengallaryProvider} from '../../providers/opengallary/opengallary';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators,FormControl,ReactiveFormsModule,NgForm } from '@angular/forms';
import { ActionSheetController } from 'ionic-angular'
import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';




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
  mySlideOptions:any;
  afList:any;
  base64Image:any;
  res:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public takePicture:TakePictureProvider,
  public actionSheetCtrl: ActionSheetController, public openGallary:OpengallaryProvider,  private vision: GoogleCloudVisionServiceProvider,
  private db: AngularFireDatabase,private alert: AlertController,public loadingCtrl: LoadingController,public camera:Camera)
 {
     this.afList = db.list('/items')

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewUserPage');

  }

  presentActionSheet() {
   let actionSheet = this.actionSheetCtrl.create({
     title: 'Chose how to upload your Photo',
     buttons: [
       {
         text: 'Open Camera',
         role: 'destructive',
         handler: () => {
           console.log('Destructive clicked');
           this.takePicture.takePicture();
         }
       },
       {
         text: 'From Gallary',
         handler: () => {
           console.log('Archive clicked');
           this.openGallary.getImages();
         }
       },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });

   actionSheet.present();
 }
 saveResults(imageData, results) {

//console.log(imageData,results);
  this.afList.push({ imageData:imageData,results:results })




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
  const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 10000
    });
    let opcoes = {
    maximumImagesCount: 1,
    sourceType: 1,
    encodingType: this.camera.EncodingType.JPEG,
    destinationType: 0, // USE THIS TO RETURN BASE64 STRING
    correctOrientation: true
  };



   this.camera.getPicture(opcoes).then((imageData) => {
//     console.log(imageData);
     loader.present();
     this.base64Image = "data:image/jpeg;base64," + imageData;
      this.vision.getLabels(imageData).subscribe(
            (val) => {
                      console.log(1);
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
                let length=this.res.length;
                if(length<5000&&length>=20){
                    this.saveResults(imageData,this.res)

                }else{
                  this.showAlert("Please provide a valid picture")
                  console.log('error');
                }
            });



      }, err => {
        console.log(1,err);
        this.showAlert(err);
      });

}



}
