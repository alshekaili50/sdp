import { Component } from '@angular/core';
import {NavController,NavParams,ToastController,AlertController,MenuController} from 'ionic-angular';
import{HomePage} from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import {NgForm } from '@angular/forms';
import {NewUserPage} from '../new-user/new-user';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  isAuth:boolean=false;
  email:string="";
  password:string="";
  toastCtrl:ToastController;
  constructor(public navCtrl: NavController, public navParams: NavParams,private afauth:AngularFireAuth
  ,private toast:ToastController,private forgotCtrl: AlertController,private menu:MenuController
  ) {
      this.menu.swipeEnable(false);




  }

  ionViewDidLoad() {

  }
  async Login(){


    try
    {


   const result=await this.afauth.auth.signInWithEmailAndPassword(this.email,this.password);
   console.log(result);
   this.toast.create({
     message:"Logged in successfully !",
     duration:3000

   }).present();



   this.navCtrl.setRoot(HomePage);

    }catch(e){
      console.log(e);
      this.toast.create({
        message:e.message,
        duration:3000

      }).present();
    }



  }
  registerPage(){
    this.navCtrl.push(NewUserPage);
  }
  forgotPass() {

    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }
}
