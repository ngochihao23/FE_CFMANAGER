import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorePage } from './store.page';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [StorePage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: StorePage }])
  ]
})
export class StorePageModule {}
