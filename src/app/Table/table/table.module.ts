import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ cần thiết cho pipe currency
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TablePage } from './table.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,    // ✅ Quan trọng
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: TablePage
      }
    ])
  ],
  declarations: [TablePage]
})
export class TablePageModule {}
