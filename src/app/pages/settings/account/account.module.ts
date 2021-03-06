import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';
import { SharedModule } from '../../../shared/shared.module';
import { AlertController } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    AccountPageRoutingModule,
    
    SharedModule
  ],
  declarations: [AccountPage]
})
export class AccountPageModule { }
