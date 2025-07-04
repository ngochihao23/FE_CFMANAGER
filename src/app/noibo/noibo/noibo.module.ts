import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoiboPageRoutingModule } from './noibo-routing.module';

import { NoiboPage } from './noibo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoiboPageRoutingModule
  ],
  declarations: [NoiboPage]
})
export class NoiboPageModule {}
