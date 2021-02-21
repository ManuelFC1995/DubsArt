import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Config, MenuController, ModalController } from '@ionic/angular';
import { Publicacion } from 'src/app/model/Publicacion';
import { Usuario } from 'src/app/model/Usuario';
import { PublicarPage } from 'src/app/pages/publicar/publicar.page';
import { ApiService } from 'src/app/services/api.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { LoadingService } from 'src/app/services/loading.service';

import { FakerService } from '../../shared/faker/faker.service';
import { MusicController } from '../../shared/music-controller/music-controller.service';

@Component({
  selector: 'app-news',
  templateUrl: 'news.page.html',
  styleUrls: ['news.page.scss']
})
export class NewsPage {
  public listadoConFoto: Array<Publicacion> = [] ;
  public listado: Array<Publicacion> = [] ;
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
  stories: any[] = [];
  posts: any[] = [];
  activeSegment: FormControl = new FormControl('news');
  segments: any[] = [
    { title: 'News', value: 'news' },
    { title: 'Discover', value: 'discover' }
  ];

  activeDiscover: FormControl = new FormControl('for_you');
  discoverCategories: any[] = [
    { id: 'Series' },
    { id: 'Peliculas' },
    { id: 'Actores' },
    { id: 'Escuelas' },
    { id: 'Videojuegos' }
   
  ];

  musics: any[] = [
    { id: '6545421321', author: 'Silent Partner', song: 'Blue Skies' },
    { id: '7854235678', author: 'Kevin MacLeod', song: 'Life of Riley' },
    { id: '5612785349', author: 'Kevin MacLeod', song: 'Sneaky Snitch' }
  ];

  isIos: boolean;

  constructor( private modalController:ModalController,private api:ApiService,
    private auth:AutenticacionService,
    private storage: NativeStorage,
    private config: Config,
    private menu: MenuController,
    private LoadingS: LoadingService,
    private fakerService: FakerService,
    private musicController: MusicController
  ) { }

  doRefresh(event) {
  
    setTimeout(async () => {
    
      this.listado= [] ;
      this.listadoConFoto = [] ;
      this.Usuario = await this.storage.getItem("userApi");
    this.Usuario=await  this.api.getUserId(this.Usuario.id);
    if(this.Usuario.foto==null){
      this.Usuario.foto="/assets/imagenes/avatar.jpg";
    }else{
      this.Usuario.foto='data:image/jpeg;base64,' +this.Usuario.foto;
    }
   this.listado= await this.api.getPublications();
   this.listado.forEach((data)=>{
    console.log(data.id_usuario)
    if(data.imagen==null){
      data.imagen="assets/imagenes/youtube-resolucion-480p.jpg";
      this.listadoConFoto.push(data);
    }else{
     data.imagen='data:image/jpeg;base64,'+data.imagen;
     console.log(data);
     this.listadoConFoto.push(data);
    }
  
  })
      event.target.complete();
    }, 2000);
  }

  toggleMenu() {
    this.menu.toggle('camera');
  }

  playMusic() {
    this.musicController.playMusic(this.musics[2]);
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
   this.listado= await this.api.getPublications();
   this.listado.forEach((data)=>{
    if(data.imagen==null){
      data.imagen="assets/imagenes/youtube-resolucion-480p.jpg";
      this.listadoConFoto.push(data);
    }else{
     data.imagen='data:image/jpeg;base64,'+data.imagen;
    
     this.listadoConFoto.push(data);
    }
    this.LoadingS.loadingController.dismiss();
  console.log(data.id_usuario)
  })
   

    this.isIos = this.config.get('mode') === 'ios';

    this.fakerService.getFaker().then((faker) => {
      this.stories = Array.apply(null, Array(10)).map(() => {
        return {
          id: faker.random.uuid(),
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          image: faker.image.avatar()
        };
      });

      this.posts = Array.apply(null, Array(10)).map(() => {
        return {
          id: faker.random.uuid(),
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          image: faker.image.avatar(),
          content: faker.lorem.sentences(),
          likes: faker.random.number(100),
          comments: faker.random.number(100),
          shared: faker.random.number(100)
        };
      });
    });
   
  }

  ionViewDidEnter() {
    this.menu.enable(true, 'camera');
  }

  ionViewDidLeave() {
    this.menu.enable(false, 'camera');
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
}
