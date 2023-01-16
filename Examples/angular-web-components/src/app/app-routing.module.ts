import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TableComponent } from './components/table/table.component';
import { ImageGroupComponent } from './components/image-group/image-group.component';

const routes: Routes = [
  {
    path: 'table',
    component: TableComponent,
    data: {
      header: 'Table'
    }
  },
  {
    path: 'image-group',
    component: ImageGroupComponent,
    data: {
      header: 'Image Group'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
