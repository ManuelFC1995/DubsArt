import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { Publicacion } from 'src/app/model/Publicacion';
import { Usuario } from 'src/app/model/Usuario';
import { PublicarPage } from 'src/app/pages/publicar/publicar.page';
import { ApiService } from 'src/app/services/api.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { LoadingService } from 'src/app/services/loading.service';
import { FakerService } from 'src/app/shared/faker/faker.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

  public listado: Array<Publicacion> ;
  public listadoConFoto: Array<Publicacion> = [] ;
  user = {
    full_name: '',
    nickname: '',
    image: "/assets/imagenes/avatar.jpg",
    status: '',
    online: false,
    isMobileOnline: true
  };
  public Usuario:Usuario  | null= {
    id : undefined,
    name:undefined,
    foto:"/assets/imagenes/avatar.jpg",
     biografia:undefined,
    publicaciones: undefined
  };
numero_publicaciones:number ;
  constructor( public alertController: AlertController, private modalController:ModalController,
    private menu: MenuController,
    private LoadingS: LoadingService,
    private fakerService: FakerService,
    private api:ApiService,
    private auth:AutenticacionService,
    private storage: NativeStorage
  ) { }

  toggleMenu() {
    this.menu.toggle('profile');
  }

 

  doRefresh(event) {
    setTimeout(async () => {
     
      this.Usuario = await this.storage.getItem("userApi");
      this.Usuario=await  this.api.getUserId(this.Usuario.id);
      if(this.Usuario.foto==null){
        this.Usuario.foto="/assets/imagenes/avatar.jpg";
      }else{
        this.Usuario.foto='data:image/jpeg;base64,' +this.Usuario.foto;
      }

       this.listado= [] ;
       this.listadoConFoto = [] ;
      this.listado=this.Usuario.publicaciones;
      this.listado.forEach((data)=>{
        if(data.imagen==null){
          data.imagen="assets/imagenes/youtube-resolucion-480p.jpg";
          this.listadoConFoto.push(data);
        }else{
         data.imagen='data:image/jpeg;base64,'+data.imagen;
         console.log(data);
         this.listadoConFoto.push(data);
        }
      
      })
       this.numero_publicaciones=this.Usuario.publicaciones.length;
      console.log(this.Usuario);
      console.log(this.Usuario.publicaciones);
      event.target.complete();
      console.log(this.Usuario);
    }, 500);
  }

  getUser() {

  
  }
  async ngOnInit(): Promise<void> {
this.LoadingS.presentLoading();
    this.Usuario = await this.storage.getItem("userApi");
    this.Usuario=await  this.api.getUserId(this.Usuario.id);
    if(this.Usuario.foto==null){
      this.Usuario.foto="/assets/imagenes/avatar.jpg";
    }else{
      this.Usuario.foto='data:image/jpeg;base64,' +this.Usuario.foto;
    }
    this.listado=this.Usuario.publicaciones;
    this.listado.forEach((data)=>{
      if(data.imagen==null){
        data.imagen="assets/imagenes/youtube-resolucion-480p.jpg";
        this.listadoConFoto.push(data);
      }else{
       data.imagen='data:image/jpeg;base64,'+data.imagen;
       console.log(data);
       this.listadoConFoto.push(data);
      }
    
    })
     this.numero_publicaciones=this.Usuario.publicaciones.length;
     this.LoadingS.loadingController.dismiss();
    console.log(this.Usuario);
    console.log(this.Usuario.publicaciones);
  }

  ionViewDidEnter() {
    this.menu.enable(true, 'profile');

  }

  ionViewDidLeave() {
    this.menu.enable(false, 'profile');
  }
 

  public async Publicar(){
    const modal = await this.modalController.create({
      component: PublicarPage,
      cssClass: 'my-custom-class',
      componentProps:{
      
      }
    });
    return await modal.present();
  }

  public async borraPublicacion(id:any){

    this.api.removePublication(id)
    .then(()=>{
      //ya está borrada allí
   
    
      let event;
   this.doRefresh(event);
   this.LoadingS.presentToast("Publicacion Borrada","success");
    })
    .catch(err=>{
     
    
    })
  }

  async presentAlertConfirmDelete(id:any) {
  
    const alert = await this.alertController.create({
      header:  "Atención!",
      message: "Seguro que desea Borrar la Publicacion?",
      buttons: [
        {
          text: "cancelar",
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text:  "Borrar",
          handler: async () => {
            await this.LoadingS.presentLoading();
            this.borraPublicacion(id);
            this.LoadingS.loadingController.dismiss();
          }
        }
      ]
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }

}
