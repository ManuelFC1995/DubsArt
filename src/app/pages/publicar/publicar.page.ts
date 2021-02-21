import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController, ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Publicacion } from 'src/app/model/Publicacion';
import { Multimedia } from 'src/app/model/Multimedia';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.page.html',
  styleUrls: ['./publicar.page.scss'],
})


export class PublicarPage implements OnInit {
private valid:boolean;
  private imagen:string;
 private imagenBBDD:string;
 public tasks:FormGroup;
 public User:Usuario  | null= {
  id : undefined,
  name:undefined,
  foto:"/assets/imagenes/avatar.jpg",
   biografia:undefined,
  publicaciones: undefined
};
 
  public Publicacion:Publicacion  | null= {
    id : undefined,
    descripcion:undefined,
    id_usuario:undefined,
    multimedia:undefined,
    imagen:undefined
  };


  constructor(private router: Router,
    private activatedRouter: ActivatedRoute,private LoadingS: LoadingService,private modalController:ModalController,private webView: WebView,private apiS:ApiService, private formBuilder:FormBuilder,
    private camera:Camera, public alertController: AlertController  ,private storage: NativeStorage) {
      this.tasks=this.formBuilder.group({
      
        descripcion:[''],
      
      })
   }

  async ngOnInit() {
    this.imagen="assets/imagenes/youtube-resolucion-480p.jpg"
    this.User = await this.storage.getItem("userApi");
    this.User=await  this.apiS.getUserId(this.User.id);
   
  this.Publicacion.descripcion="";
   this.Publicacion.id_usuario=this.User.id;
    console.log(this.User);
    console.log(this.Publicacion);
 
  }

  public async sendForm(){
    await this.LoadingS.presentLoading();
    
   
     
     // this.Publicacion.descripcion=this.tasks.get('description').value;
    
      console.log(this.User);
     // this.User.publicaciones.push(this.Publicacion);
      console.log(this.User.publicaciones);
      this.Publicacion={
        descripcion:  this.tasks.get('descripcion').value,
        imagen:this.imagenBBDD,
        usuario:this.User
      }
      console.log(this.Publicacion);
       await  this.apiS.createPublication(this.Publicacion)
      .then((respuesta)=>{
       console.log(respuesta);
     
         this.LoadingS.loadingController.dismiss();
          this.LoadingS.presentToast("Publicacion guardada","success");
          this.atras();
        })
        .catch((err)=>{
          this.LoadingS.loadingController.dismiss();
         this.LoadingS.presentToast("Error guardando Imagen","danger");
          console.log(err);
        }) 
      }
     
      
 
  

  
  
  
  
  
  GuardarFoto(){
    console.log(this.Publicacion);
    this.apiS.createPublication(this.Publicacion).then(data=>{
      console.log(data);
    }).catch((err)=>{
      console.log(err);
    }
    )
  
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.camera.getPicture(options)
    .then((imageData) => {
      this.imagen = 'data:image/jpeg;base64,' + imageData;
      this.imagenBBDD=imageData;
      console.log(this.Publicacion);
    }, (err) => {
      console.log(err);
    });

  
  }
  takeGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.camera.getPicture(options)
    .then((imageData) => {
      this.imagen = 'data:image/jpeg;base64,' + imageData;
      this.imagenBBDD=imageData;
      console.log(this.Publicacion);
    }, (err) => {
      console.log(err);
    });
 
  }

  async presentAlertFotos() {
  
    const alert = await this.alertController.create({
      header: 'Subir archivo',
      message: 'Elija una opcion ',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Camara',
          handler: () => {
            this.takePicture();
          
          }
        },{
          text: 'Galeria',
          handler: () => {
            this.takeGallery();
          
          }
        }
      ]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
}
  public atras(){
    this.modalController.dismiss();
      }
}
