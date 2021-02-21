import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { UserInfoPage } from 'src/app/pages/user-info/user-info.page';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-explore',
  templateUrl: 'explore.page.html',
  styleUrls: ['explore.page.scss']
})
export class ExplorePage {
  public listado: Array<Usuario> ;
  public listadoConFoto: Array<Usuario> = [] ;

  textoBuscar='';
  constructor(    private LoadingS: LoadingService,private api:ApiService,  private modalController:ModalController,) {}
ngOnInit(){

  this.carga();

}
  public async carga(){
    try{
      this.listadoConFoto= [] ;
      this.LoadingS.presentLoading();
   this.listado= await this.api.getUserall();
   console.log(this.listado);
 this.listado.forEach((data)=>{
   if(data.foto==null){
     data.foto="/assets/imagenes/avatar.jpg";
     this.listadoConFoto.push(data);
   }else{
    data.foto='data:image/jpeg;base64,'+data.foto;
    console.log(data);
    this.listadoConFoto.push(data);
   }
 
 })
 this.LoadingS.loadingController.dismiss();
}
    catch(err){
   console.log(err);
   this.listado=null;
   this.LoadingS.loadingController.dismiss();
    }
     }


     public async infoUsuario(Usuario:Usuario){
      const modal = await this.modalController.create({
        component: UserInfoPage,
        cssClass: 'my-custom-class',
        componentProps:{
          Usuario:Usuario
        }
      });
      return await modal.present();
    }
    Buscar(event){
      this.textoBuscar=event.detail.value;
          }
        
        
        
          doRefresh(event) {
            setTimeout(async () => {
              this.carga();
              event.target.complete();
            }, 500);
          }
}
