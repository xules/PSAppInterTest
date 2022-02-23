import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PsychologistPage } from './psychologist.page';

const routes: Routes = [
  {
    path: '',
    component: PsychologistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PsychologistPageRoutingModule {}
