import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor(   public loadingController: LoadingController,
    public toastController: ToastController) { }
  
  
    async presentLoading() {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
      
      
        spinner:"crescent",
      
      });
      await loading.present();
    }
    async presentToast(msg:string,col:string) {
      const toast = await this.toastController.create({
        message: msg,
        color:col,
        duration: 2000,
        position:"middle"
      });
      toast.present();
    }
}
