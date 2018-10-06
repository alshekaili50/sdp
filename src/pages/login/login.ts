import { Component } from '@angular/core';
import {NavController,NavParams,ToastController,AlertController,MenuController} from 'ionic-angular';
import{HomePage} from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import {NgForm } from '@angular/forms';
import {NewUserPage} from '../new-user/new-user';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import{UploadPicturesPage} from '../upload-pictures/upload-pictures';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  isAuth:boolean=false;
  email:string="";
  password:string="";
  afList:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private afauth:AngularFireAuth
  ,private toast:ToastController,private forgotCtrl: AlertController,
  private menu:MenuController,private toastCtrl:ToastController,private db: AngularFireDatabase
  ) {
      this.menu.swipeEnable(false);
      this.afList = db.list('/users');





  }

  ionViewDidLoad() {

  }

  register() {

    let forgot = this.forgotCtrl.create({
      title: 'New User',
      message: "Enter your full name:",
      inputs: [
        {
          name: 'name',
          placeholder: 'name',
          type: 'text'
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
          text: 'Register',
          handler: data => {
            let message:any;
            message=data;
            data.email=Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)+"@gma.com";
            let pass='123456';
            this.afauth.auth.createUserWithEmailAndPassword(data.email,pass).then(res=>{
              console.log(res);
              message=res;
              res.user.updateProfile({
              displayName:data.name,
                photoURL:'none'

              }).catch(err=>{
                console.log(err);
              }).then(res=>{
                this.db.list('/users').push({
                  uid:this.afauth.auth.currentUser.uid,
                  veryfied:'false',
                  imageDownloaded:'doNotStart',
                  name:data.name
                })

              }).then(res=>{
                this.navCtrl.setRoot(UploadPicturesPage,{'data':data});
              })

           }).catch(err=>{
             let toast = this.toastCtrl.create({
               message: err,
               duration: 3000,
               position: 'top',
               cssClass: 'dark-trans',
               closeButtonText: 'OK',
               showCloseButton: true
             });
           })
            .catch(err=>{
              message=err.message;
              console.log(err);
            })
            console.log('Send clicked');

            let toast = this.toastCtrl.create({
              message: message.message,
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
