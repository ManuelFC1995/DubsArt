import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  settings: any[] = [
    { id: 'Notificaciones', icon: 'notifications-outline', link: 'notifications' },
    { id: 'Mi cuenta', icon: 'person-outline', link: 'account' },
    { id: 'Apariencia', icon: 'color-palette-outline', link: 'appearance' },
    { id: 'General', icon: 'settings-outline', link: 'general' },
 
    { id: 'Privacidad', icon: 'hand-left-outline', link: 'privacy' },
 
   
    { id: 'Subscripciones', icon: 'card-outline', link: 'subscriptions' },
    { id: 'Sobre eldoblaje.com', icon: 'help-circle-outline', link: 'about' }
  ];
 
  
 mensaje = false;
  constructor(private autService: AutenticacionService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
   
      
          }

          isAuth() {
            return this.autService.isAuthenticated();
            }

            
  public async onLogout(){
    await this.autService.logout();
    if(!this.autService.isAuthenticated()){
      this.router.navigate(['/auth'])
    }
  }

              
  }


