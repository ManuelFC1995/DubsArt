import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ModalController, NavController } from '@ionic/angular/';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: FormGroup;
  userdata: any;
  
 mensaje = false;
  constructor(
    private fb: FormBuilder,private navCtrl: NavController,private google:GooglePlus,
    private authS:AutenticacionService,private router:Router,  
    private modalController:ModalController,private activatedRouter: ActivatedRoute,
  ) { }

  onLogin() {
    if (this.login.valid) {
      console.log(this.login.value);
    }
  }
  isAuth() {
    return this.authS.isAuthenticated();
    }
  ngOnInit() {
  
    this.login = this.fb.group({
      email: this.fb.control('', [
        Validators.required,
        Validators.email
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(150)
      ])
    });
  }

  onSubmit() {
    this.userdata = this.saveUserdata();
    this.authS.inicioSesion(this.userdata);
    setTimeout(() => {
    if (this.isAuth() === false) {
    this.mensaje = true
    }
    }, 2000);
   
    }
    saveUserdata() {
      const saveUserdata = {
      email: this.login.get('email').value,
      password: this.login.get('password').value,
      };
      return saveUserdata;
      }
}
