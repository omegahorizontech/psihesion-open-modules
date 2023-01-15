import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  {
    path: 'table',
    component: TableComponent,
    data: {
      header: 'Table'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
