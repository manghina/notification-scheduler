import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PdfPageRoutingModule } from './pdf-routing.module';

import { CardPdfComponent } from '../card-pdf/card-pdf.component';
import { PdfPage } from './pdf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PdfPageRoutingModule
  ],
  declarations: [PdfPage, CardPdfComponent]
})
export class PdfPageModule { }
