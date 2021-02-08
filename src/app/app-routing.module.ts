import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutenticacionService } from './services/autenticacion.service';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),  canActivate: [AutenticacionService]
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'bookmarks',
    loadChildren: () => import('./pages/bookmarks/bookmarks.module').then(m => m.BookmarksPageModule)
  },
  {
    path: 'stories',
    loadChildren: () => import('./pages/stories/stories.module').then(m => m.StoriesPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
