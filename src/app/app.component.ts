import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { NewUserPage } from '../pages/new-user/new-user';
import { UploadPicturesPage } from '../pages/upload-pictures/upload-pictures';
import { LoginPage } from '../pages/login/login';
import {AngularFireAuth} from 'angularfire2/auth';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  isAuth=false;
  rootPage: any = LoginPage;
  user:any;
  pages: Array<{title: string, component: any,icon:any}>;
  name:string;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private afauth :AngularFireAuth,
  private menuCtrl:MenuController) {
    this.menuCtrl.enable(false);

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage,icon: 'home'},
      { title: 'Upload Your Photos', component: UploadPicturesPage,icon: 'cloud-upload' },
    

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.afauth.auth.onAuthStateChanged(user => {
        this.user=user;
        if (user.uid!=null) {
          this.menuCtrl.enable(true);
          this.name=this.afauth.auth.currentUser.displayName;
          console.log(user.uid);
      //    console.log(user);
          this.isAuth = true;
          this.rootPage = HomePage;

        } else {
          this.menuCtrl.enable(false);
          this.isAuth = false;
          this.rootPage = LoginPage;
        }
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();}
  onLogout() {
      this.afauth.auth.signOut();
      this.menuCtrl.close();
      this.menuCtrl.enable(false);

      this.nav.setRoot(LoginPage);
  //    console.log(this.user);
    }
    openPage(page) {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.setRoot(page.component);
    }
    }
