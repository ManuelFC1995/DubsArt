import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import * as firebase from 'firebase';
import {  ActivatedRoute } from '@angular/router';
import { LoadingService } from './loading.service';


@Injectable({
  providedIn: 'root'
})

export class AutenticacionService implements CanActivate {
  user:any;
  constructor(private router: Router,private storage: NativeStorage,
    private activatedRouter: ActivatedRoute,private LoadingService: LoadingService) { 
   
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

  registroUsuario (userdata) {
    firebase.auth().createUserWithEmailAndPassword(userdata.email,
   userdata.password)
    .catch(error => {
      console.log(error);
      }
      )
      }


      async inicioSesion (userdata) {
        firebase.auth().signInWithEmailAndPassword(userdata.email,
        userdata.password)
        .then(async response => {
        console.log(response);
        this.user = firebase.auth().currentUser;
        await this.storage.setItem("user",this.user);
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