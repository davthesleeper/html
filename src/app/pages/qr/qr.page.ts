import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage {
  scanResult: string | null = null;
  isScanning: boolean = false;

  constructor() {}

  async startScan() {
    // Solicitar permiso para usar la cámara
    const status = await BarcodeScanner.checkPermission({ force: true });

    if (status.granted) {
      this.isScanning = true;

      BarcodeScanner.hideBackground(); // Oculta la pantalla de fondo para mejorar la visibilidad

      const result = await BarcodeScanner.startScan(); // Inicia el escáner
      this.isScanning = false;

      if (result.hasContent) {
        this.scanResult = result.content; // Almacena el resultado del código QR
      }
    } else {
      alert('Permiso denegado para usar la cámara');
    }
  }

  stopScan() {
    BarcodeScanner.stopScan(); // Detiene el escáner
    this.isScanning = false;
  }
}
