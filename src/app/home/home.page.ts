import { Component } from '@angular/core';
import { ApiProductosService } from './../servicios/api-productos.service';
import { ViewWillEnter, ViewDidLeave } from '@ionic/angular';
import { ResultadoAPI } from './../interfaces/ResultadoAPI';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements ViewWillEnter, ViewDidLeave {
  private susProducto!: Subscription;
  public losDatos!: ResultadoAPI;
  constructor(
    public api: ApiProductosService
  ) {}
  
  ionViewWillEnter(): void {
    this.susProducto = this.api.productos.subscribe(algoMeEntrega => {
      if(algoMeEntrega){
        this.losDatos = algoMeEntrega;
      }
    });
    this.api.obtenerProductos();
  }

  ionViewDidLeave(): void {
    this.susProducto.unsubscribe();
  }
  

}
