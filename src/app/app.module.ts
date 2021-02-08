import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './shared/shared.state';
import { SettingsEffects } from './shared/settings/settings.effects';
import { MusicEffects } from './shared/music/music.effects';
import { SharedModule } from './shared/shared.module';
import { MusicPlayerComponent } from './shared/music-player/music-player.component';
import { AutenticacionService } from './services/autenticacion.service';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { LoadingService } from './services/loading.service';
firebase.initializeApp(environment.firebaseConfig);
@NgModule({
  declarations: [
    AppComponent,
    MusicPlayerComponent
  ],
  entryComponents: [
    MusicPlayerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(),
  
    HttpClientModule,
    /* NGX TRANSLATE */
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    }),

    AppRoutingModule,
    SharedModule,

    /* NGRX */
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      SettingsEffects,
      MusicEffects
    ])
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CameraPreview,
    ScreenOrientation,
    NativeStorage,
    GooglePlus,
    AutenticacionService,
    LoadingService,
  

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
