import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ModalPageRoutingModule } from './modal-routing.module';

import { ModalPage } from './modal.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddFormComponent } from '../add-form/add-form.component';
import { EditFormComponent } from '../edit-form/edit-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalPage, AddFormComponent, EditFormComponent]
})
export class ModalPageModule {}
