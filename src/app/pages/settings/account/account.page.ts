import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ApiService } from 'src/app/services/api.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { FakerService } from 'src/app/shared/faker/faker.service';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Publicacion } from 'src/app/model/Publicacion';
import { LoadingService } from 'src/app/services/loading.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  private imagen:string;
  public tasks:FormGroup;
  public listado: Array<Publicacion> ;
  public Usuario:Usuario  | null= {
    id : undefined,
    name:undefined,
    foto:"/assets/imagenes/avatar.jpg",
     biografia:undefined,
    publicaciones: undefined
  };
  constructor(private webView: WebView,private apiS:ApiService, private formBuilder:FormBuilder,
    private camera:Camera, private modalController:ModalController, public alertController: AlertController 
    ,private menu: MenuController,
    private fakerService: FakerService,
    private api:ApiService,
    private auth:AutenticacionService,
    private storage: NativeStorage,  private LoadingS: LoadingService,) { 

      this.tasks=this.formBuilder.group({
      
        biografia:[''],
      
      })
    }

  async ngOnInit() {
  
    this.Usuario = await this.storage.getItem("userApi");
    this.Usuario=await  this.api.getUserId(this.Usuario.id);
    this.listado=this.Usuario.publicaciones;
console.log(this.listado);
   if(this.Usuario.foto==null){
     this.Usuario.foto="/assets/imagenes/avatar.jpg";
   }
     else{
        this.imagen='data:image/jpeg;base64,' +this.Usuario.foto;
      }
  }

  public async sendFormBio(){
    await this.LoadingS.presentLoading();
    this.Usuario=await  this.api.getUserId(this.Usuario.id);
  
     
      this.Usuario.biografia=this.tasks.get('biografia').value;
  console.log(this.Usuario);
    
        this.apiS.updateItem(this.Usuario)
        .then((respuesta)=>{
          this.tasks.setValue({
            biografia:''

          })
       
         this.LoadingS.loadingController.dismiss();
        
        })
        .catch((err)=>{
          this.LoadingS.loadingController.dismiss();
          this.LoadingS.presentToast("Error guardando Biografia","danger");
          console.log(err);
        })


      }

      async GuardarFoto(){
        await this.LoadingS.presentLoading();
        console.log(this.Usuario);
        this.apiS.updateItem(this.Usuario).
        then(data=>{
          console.log(data);
          if(this.listado!==null){
            this.listado.forEach((data)=>{
              this.apiS.removePublication(data.id);
              let Publicacion={
                descripcion: data.descripcion,
                imagen:data.imagen,
                usuario:this.Usuario
              }
              this.apiS.createPublication(Publicacion);
         
              }
            )
          }
       
          this.LoadingS.loadingController.dismiss();
          this.LoadingS.presentToast("Perfil Actualizado","success");
        
        }).catch((err)=>{
          console.log(err);
          this.LoadingS.loadingController.dismiss();
          this.LoadingS.presentToast("Error en la captura de imagen","danger");
        }
        )
      this.listado=null;
      
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
        .then(async (imageData) => {
          await this.LoadingS.presentLoading();
          this.imagen = 'data:image/jpeg;base64,' + imageData;
          this.Usuario.foto=imageData;
          console.log(this.Usuario);
          this.LoadingS.loadingController.dismiss();
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
        .then(async (imageData) => {
          await this.LoadingS.presentLoading();
          this.imagen = 'data:image/jpeg;base64,' + imageData;
          this.Usuario.foto=imageData;
          console.log(this.Usuario);
          this.LoadingS.loadingController.dismiss();
        }, (err) => {
          console.log(err);
          this.LoadingS.loadingController.dismiss();
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
}
