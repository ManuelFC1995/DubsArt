import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import * as firebase from 'firebase';
import {  ActivatedRoute } from '@angular/router';
import { LoadingService } from './loading.service';
import { Usuario } from '../model/Usuario';
import { ApiService } from './api.service';



@Injectable({
  providedIn: 'root'
})

export class AutenticacionService implements CanActivate {
  //usuario firebase
  user:any;
  //Usuario Api
  userApi: Usuario | null= {
    id : undefined,
    name:undefined,
    foto:undefined,
     biografia:undefined,
    publicaciones: undefined
  };

  constructor(private router: Router,private storage: NativeStorage,
    private activatedRouter: ActivatedRoute,private LoadingService: LoadingService,
    private api:ApiService) { 
   
    }

    async init() {

      let u = null;
      try {
        u = await this.storage.getItem("user");
      } catch (err) {
        u = null;
      }
      if (u != null) {
        this.user = u;
      }
    }

  registroUsuario (userdata ):Promise<firebase.auth.UserCredential> {
  return  firebase.auth().createUserWithEmailAndPassword(userdata.email,
   userdata.password)
      }


      async inicioSesion (userdata) {
        firebase.auth().signInWithEmailAndPassword(userdata.email,
        userdata.password)
        .then(async response => {
     this.userApi= await this.api.getUserId(response.user.uid);
     console.log(this.userApi);
        this.user = firebase.auth().currentUser;
        await this.storage.setItem("user",this.user);
        await this.storage.setItem("userApi",this.userApi);
       this.router.navigate(['/']);
       })
      .catch(
      error => {
    
      console.log(error);
      }
      )
     
      return this.user;
     
      }

      isAuthenticated() {
     
        if (this.user) {
        return true;
        } else {
        return false;
        }
        }

        async logout() {
          
          firebase.auth().signOut();
          this.user=null;
          await this.storage.setItem("user",this.user);
          this.userApi= {
            id : undefined,
            name:undefined,
            foto:undefined,
             biografia:undefined,
            publicaciones: undefined
          };
          await this.storage.setItem("userApi",this.userApi);
       
  
     
          } 

          canActivate(route: ActivatedRouteSnapshot): boolean {
            console.log("ESTOY EN CANACTIVATE Y EL RESULT ES "+this.isAuthenticated())
            if (!this.isAuthenticated()) {
              this.router.navigate(["auth"]);
              return false;
            }
            return true;
          }
          getUser(){
            const user = firebase.auth().currentUser;
            
            return user;
          }

}