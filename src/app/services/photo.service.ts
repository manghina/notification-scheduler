import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { UserPhoto } from '../models/UserPhoto';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  photos : UserPhoto[] = [];

  constructor() { }

  public async addNewToGallery() {

    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
 
    this.photos.unshift({
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath!
    });    
  }

}
