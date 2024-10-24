import { Component, OnInit } from '@angular/core';
import { ApiProductosService } from '../servicios/api-productos.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  products: any[] = []; // Arreglo para almacenar los productos
  currentPage: number = 1; // Página actual
  totalProducts: number = 0;
  productsPerPage: number = 30; // Número de productos por página


  constructor(private productService: ApiProductosService) {}

  ngOnInit(): void {
    this.loadProducts(); // Cargar productos al iniciar
  }

  private loadProducts() {
    this.productService.getProducts(this.currentPage, this.productsPerPage).then(data => {
      this.products = data.products;
      this.totalProducts = data.total;
    }).catch(error => {
      console.error('Error al obtener productos:', error);
    });
  }

  nextPage() {
    if (this.currentPage < this.totalProducts) {
      this.currentPage++;
      this.loadProducts(); // Volver a cargar productos para la nueva página
    }
  }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts(); // Volver a cargar productos para la nueva página
    }
  }
  

}
