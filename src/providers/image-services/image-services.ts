import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { AngularFireStorage,AngularFireStorageReference,AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';


/*
  Generated class for the ImageServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageServicesProvider {
  task:AngularFireUploadTask
  progress: any;  // Observable 0 to 100
  profileUrl: Observable<string | null>;


  constructor(public http: HttpClient,private db:AngularFireDatabase,private storage:AngularFireStorage,private auth: AngularFireAuth) {
    console.log('Hello ImageServicesProvider Provider');

  }

  async countImagesOfUser(uid){
    let n:number=0;
  await this.db.database.ref('/images').orderByChild('uid').equalTo(uid).once("value", function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(function(data) {
        n++;
    });
}).then(res=>{
  if(n>=1){
    this.verifyingAccount(uid);
  }
})
  return n;



  }
  uploadImageOfUser(uid,image) {
  let rand=Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  let uri=uid+'/'+rand;

  const storageRef: AngularFireStorageReference = this.storage
      .ref(uid+'/'+rand);
    this.db.list('/images').push({
      uid:uid,
      imageUrl:uri,
    })
   this.task=storageRef.putString(image, 'base64', {contentType: 'image/png'});
  return this.task.percentageChanges();
  }






  async getImagesOfUser(uid){
    let imageRefs:any[]=[];
  await   this.db.database.ref('/images').orderByChild('uid').equalTo(uid).once("value", function(snapshot) {
      snapshot.forEach(function(data) {
          imageRefs.push(data.child('imageUrl').val());

      });
  }).then(res=>{
      let ref= this.storage.ref('images');
    this.profileUrl = ref.getDownloadURL();

    console.log(this.profileUrl);



  }).catch(err=>{
    console.log(err);
  })





    }


  verifyingAccount(uid){
    this.db.list('/users');
    let key:any;
    let imageDownloaded:any;

    this.db.database.ref('/users').orderByChild('uid').equalTo(uid).once("value", function(snapshot) {
        snapshot.forEach(function(data) {
          console.log(data.key);
          key=data.key
          imageDownloaded=data.child('imageDownloaded').val()



        });
  }).then(res=>{
    if(imageDownloaded != 'downloaded')
    this.db.database.ref('/users/'+key).update({
      veryfied:'true',
      imageDownloaded:'start'
    },res=>{
      console.log('Veryfied Checked !!!')
    })
  });
}




  deleteImageofUser(uid,image){

  }


}
