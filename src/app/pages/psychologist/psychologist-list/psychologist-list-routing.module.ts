import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PsychologistListPage } from './psychologist-list.page';

const routes: Routes = [
  {
    path: '',
    component: PsychologistListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PsychologistListPageRoutingModule {}
