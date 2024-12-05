import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrPageRoutingModule } from './qr-routing.module'; // Importa el módulo de enrutamiento
import { QrPage } from './qr.page'; // Importa el componente QR

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrPageRoutingModule, // Enlaza el enrutamiento de la página
  ],
  declarations: [QrPage], // Declara la página QR
})
export class QrPageModule {}
