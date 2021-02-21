import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExplorePage } from './explore.page';
import { ExplorePageRoutingModule } from './explore-routing.module';

import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    ExplorePageRoutingModule,
    PipesModule,
    SharedModule
  ],
  declarations: [ExplorePage]
})
export class ExplorePageModule { }
