import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadPicturesPage } from './upload-pictures';

@NgModule({
  declarations: [
    UploadPicturesPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadPicturesPage),
  ],
})
export class UploadPicturesPageModule {}
