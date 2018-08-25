import { Component } from '@angular/core';
import {NavController,NavParams,ToastController} from 'ionic-angular';
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
  email:string;
  password:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private afauth:AngularFireAuth
  ,private toast:ToastController
  ) {




  }

  ionViewDidLoad() {

  }
  async Login(data:NgForm){
    this.email=data.value.email;
    this.password=data.value.password;

    try
    {


   const result=await this.afauth.auth.signInWithEmailAndPassword(this.email,this.password);
   console.log(result);


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
}
