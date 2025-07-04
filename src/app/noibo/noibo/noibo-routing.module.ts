import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoiboPage } from './noibo.page';

const routes: Routes = [
  {
    path: '',
    component: NoiboPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoiboPageRoutingModule {}
