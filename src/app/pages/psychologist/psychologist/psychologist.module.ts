import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PsychologistPageRoutingModule } from './psychologist-routing.module';

import { PsychologistPage } from './psychologist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PsychologistPageRoutingModule
  ],
  declarations: [PsychologistPage]
})
export class PsychologistPageModule {}
