import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiEvaluationsService {
  private collectionName = 'evaluations'; // Nombre de la colección en Firestore

  constructor(private firestore: AngularFirestore) {}

  // Obtener todas las evaluaciones
  getEvaluations(): Observable<any[]> {
    return this.firestore.collection(this.collectionName).valueChanges();
  }

  // Agregar nueva evaluación
  addEvaluation(evaluation: any): Promise<any> {
    return this.firestore.collection(this.collectionName).add(evaluation);
  }
}
