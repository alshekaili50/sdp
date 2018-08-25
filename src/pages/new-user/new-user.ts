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
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {HomePage} from '../home/home';
import { ToastController } from 'ionic-angular';




/**
 * Generated class for the NewUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-user',
  templateUrl: 'new-user.html',
})
export class NewUserPage {
  @ViewChild(Slides) slides: Slides;
  model: any = {};
  mySlideOptions:any;
  afList:any;
  base64Image:any;
  res:any;
  signupError: string;
  data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public takePicture:TakePictureProvider,
  public actionSheetCtrl: ActionSheetController, public openGallary:OpengallaryProvider,  private vision: GoogleCloudVisionServiceProvider,
  private db: AngularFireDatabase,private alert: AlertController,public loadingCtrl: LoadingController,public camera:Camera
  ,public auth:AuthServiceProvider,private toastCtrl: ToastController)
 {
     this.afList = db.list('/items')
     this.data={
       firstName:'',
       lastName:'',
       email:'',
       password:''
     }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewUserPage');
    this.slides.lockSwipeToNext(false)

  }

  goToSlide(){
    this.slides.lockSwipeToNext(false)
    this.slides.slideTo(1, 500);
    this.slides.lockSwipeToPrev(false)

  }


showAlert(message) {
  let alert = this.alert.create({
    title: 'Error',
    subTitle: message,
    buttons: ['OK']
  });
  alert.present();
}

signUp() {



		let credentials = {
			email: this.data.email,
			password: this.data.password
		};
    console.log(credentials);

		this.auth.signUp(credentials).then(res=>{
      this.presentToast('Account created successfully');
       this.navCtrl.setRoot(HomePage);

    }).catch(err=>{
      this.presentToast(err)
    })


}

presentToast(message) {
  let toast = this.toastCtrl.create({
    message: message,
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}




}
