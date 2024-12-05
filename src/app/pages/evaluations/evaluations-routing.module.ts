import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationsPage } from './evaluations.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluationsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluationsPageRoutingModule {}
