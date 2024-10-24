import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// Importar el proveedor de consumo de http
// Esto es de Angular 18 +
import { provideHttpClient  } from '@angular/common/http';
// Para angular 18- se debe usar HttpClientModule
// import { HttpClientModule } from '@angular/common/http'
// Este modulo se debe agregar a los imports 


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    provideHttpClient()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
