import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {NewUserPage} from '../pages/new-user/new-user';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { TakePictureProvider } from '../providers/take-picture/take-picture';
import { OpengallaryProvider } from '../providers/opengallary/opengallary';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../environment/firebase';
import { ImagePicker } from '@ionic-native/image-picker';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { GoogleCloudVisionServiceProvider } from '../providers/google-cloud-vision-service/google-cloud-vision-service';
import { HttpClientModule} from "@angular/common/http"




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    NewUserPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    NewUserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    TakePictureProvider,
    AngularFireAuth,
    ImagePicker,
    OpengallaryProvider,
    GoogleCloudVisionServiceProvider,


  ]
})
export class AppModule {}
