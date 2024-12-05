import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrPage } from './qr.page'; // Importa el componente QR

const routes: Routes = [
  {
    path: '',
    component: QrPage, // Asigna el componente QR como la página principal de esta ruta
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Configura las rutas secundarias
  exports: [RouterModule],
})
export class QrPageRoutingModule {}
