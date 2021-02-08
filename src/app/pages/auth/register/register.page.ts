import { Component, OnInit } from '@angular/core';
import {FormControl,  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  register: FormGroup;
  userdata: any; 
  erroresForm = {
    'email': '',
    'password': ''
    }
  mensajesValidacion = {
    'first_name': {
      'required': 'Nombre de usuario Obligatorio',
      'first_name': 'Introduzca un nombre válido'
      },
    'email': {
    'required': 'Email obligatorio',
    'email': 'Introduzca una dirección email correcta'
    },
    'password': {
    'required': 'Contraseña obligatoria',
    'pattern': 'La contraseña debe tener al menos una letra un número ',
    'minlength': 'y más de 6 caracteres'
    }
    }
  constructor(
    private fb: FormBuilder,private formBuilder: FormBuilder,
      private autService: AutenticacionService,
      private router: Router,
      private activatedRouter: ActivatedRoute
  ) { }

  onRegister() {
    if (this.register.valid) {
      console.log(this.register.value);
    }
  }

  onSubmit() {
    this.userdata = this.saveUserdata();
    this.autService.registroUsuario(this.userdata);
    this.router.navigate(['/auth'])
    }

  ngOnInit() {
    this.register = this.fb.group({
      first_name: this.fb.control('', [
        Validators.required,
        Validators.maxLength(20)
      ]),
    
      email: this.fb.control('', [
        Validators.required,
        Validators.email
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(8),
        Validators.maxLength(150)
      ]),
      password_confirm: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(150)
      ])
    }, {
      validators: this.passwordConfirmMatchValidator
    });
    this.register.valueChanges.subscribe(data =>
      this.onValueChanged(data));
       this.onValueChanged();
  }

  passwordConfirmMatchValidator(g: FormGroup) {
    const password = g.get('password');
    const password_confirm = g.get('password_confirm');

    if (password_confirm.hasError('required') || password_confirm.hasError('minlength')) return;

    if (password.value !== password_confirm.value) {
      password_confirm.setErrors({
        mismatch: true
      });
    } else {
      password_confirm.setErrors(null);
    }
  }
  saveUserdata() {
    const saveUserdata = {
      
    email: this.register.get('email').value,
    password: this.register.get('password').value,
    };
    return saveUserdata;
    }

    onValueChanged(data?: any) {
      if (!this.register) { return; }
      const form = this.register;
      for (const field in this.erroresForm) {
     
      this.erroresForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
      const messages = this.mensajesValidacion[field];
      for (const key in control.errors) {
      this.erroresForm[field] += messages[key] + ' ';
      }
      }
      }
    }
}
