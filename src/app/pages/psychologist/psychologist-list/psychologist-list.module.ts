import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PsychologistListPageRoutingModule } from './psychologist-list-routing.module';

import { PsychologistListPage } from './psychologist-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PsychologistListPageRoutingModule
  ],
  declarations: [PsychologistListPage]
})
export class PsychologistListPageModule {}
