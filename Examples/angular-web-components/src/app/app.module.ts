import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { ImageGroupComponent } from './components/image-group/image-group.component';

import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ImageGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: []
})

export class AppModule {
  constructor(private injector: Injector) {
    const tableElement = createCustomElement(TableComponent, { injector });
    customElements.define('psi-table', tableElement);

    const imageGroupElement = createCustomElement(ImageGroupComponent, { injector });
    customElements.define('psi-image-group', imageGroupElement);
  }
  ngDoBootstrap() {}
}
