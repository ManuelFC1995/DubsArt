import { Component, Input, OnInit } from '@angular/core';
import { Platform, NavController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { ApiService } from 'src/app/services/api.service';
import { Publicacion } from 'src/app/model/Publicacion';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
  @Input('Usuario') Usuario: Usuario;
  numero_publicaciones: number;
  imagen:string
  public listado: Array<Publicacion>;
  public listadoConFoto: Array<Publicacion> = [];
  constructor(private modalController: ModalController, private api: ApiService,) { }

  async ngOnInit() {
    this.Usuario = await this.api.getUserId(this.Usuario.id);
    if (this.Usuario.foto == null) {
      this.Usuario.foto = "/assets/imagenes/avatar.jpg";
    } else {
      this.Usuario.foto = 'data:image/jpeg;base64,' + this.Usuario.foto;
    }
    this.numero_publicaciones = this.Usuario.publicaciones.length;


    this.listado = [];
    this.listadoConFoto = [];
    this.listado = this.Usuario.publicaciones;
    this.listado.forEach((data) => {
      if (data.imagen == null) {
        data.imagen = "assets/imagenes/youtube-resolucion-480p.jpg";
        this.listadoConFoto.push(data);
      } else {
        data.imagen = 'data:image/jpeg;base64,' + data.imagen;
        console.log(data);
        this.listadoConFoto.push(data);
      }

    })
    this.numero_publicaciones = this.Usuario.publicaciones.length;
    console.log(this.Usuario);
    console.log(this.Usuario.publicaciones);

  }
  async ionViewDidEnter() {
 

  }
  doRefresh(event) {
    setTimeout(async () => {

      this.Usuario = await this.api.getUserId(this.Usuario.id);
      if (this.Usuario.foto == null) {
        this.Usuario.foto = "/assets/imagenes/avatar.jpg";
      } else {
        this.Usuario.foto = 'data:image/jpeg;base64,' + this.Usuario.foto;
      }
      this.numero_publicaciones = this.Usuario.publicaciones.length;


      this.listado = [];
      this.listadoConFoto = [];
      this.listado = this.Usuario.publicaciones;
      this.listado.forEach((data) => {
        if (data.imagen == null) {
          data.imagen = "assets/imagenes/youtube-resolucion-480p.jpg";
          this.listadoConFoto.push(data);
        } else {
          data.imagen = 'data:image/jpeg;base64,' + data.imagen;
          console.log(data);
          this.listadoConFoto.push(data);
        }

      })
      this.numero_publicaciones = this.Usuario.publicaciones.length;
      console.log(this.Usuario);
      console.log(this.Usuario.publicaciones);
      event.target.complete();


    }, 500);
  }

  public atras() {
    this.modalController.dismiss();
  }
}
