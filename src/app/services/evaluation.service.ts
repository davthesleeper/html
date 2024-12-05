import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class EvaluationService {
  constructor(private firestore: Firestore) {}

  addEvaluation(data: any) {
    const evaluationsRef = collection(this.firestore, 'evaluations');
    return addDoc(evaluationsRef, data);
  }

  getEvaluations() {
    const evaluationsRef = collection(this.firestore, 'evaluations');
    return collectionData(evaluationsRef, { idField: 'id' }).toPromise();
  }
}
