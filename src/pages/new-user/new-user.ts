import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TakePictureProvider} from '../../providers/take-picture/take-picture';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public takePicture:TakePictureProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewUserPage');
  }
  

}
