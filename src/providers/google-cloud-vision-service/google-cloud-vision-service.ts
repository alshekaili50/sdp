import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environment/firebase';
@Injectable()
export class GoogleCloudVisionServiceProvider {
  constructor(private http: HttpClient) { }
   getLabels(base64Image) {
     console.log('inside getLables')
    const body = {

      "requests": [
        {
          "image": {
            "content": base64Image
          },
          "features": [
            {
              "type": "FACE_DETECTION"
            }
          ]
        }
      ]
    }
    console.log('ejrror');
     return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + environment.firebase.googleCloudVisionAPIKey, body)


    }

    }
