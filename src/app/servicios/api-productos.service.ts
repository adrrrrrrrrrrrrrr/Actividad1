import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { ResultadoAPI } from './../interfaces/ResultadoAPI';
import { Observable, BehaviorSubject, delay  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiProductosService {
  private readonly URL_PRODUCTOS: string = "https://dummyjson.com/products";

  private $productos = new BehaviorSubject<null | ResultadoAPI>(null);
  // Se libera para las demas clases :D
  public productos = this.$productos.asObservable();
  // Cargando y otra forma de suscripción
  private $cargando = new BehaviorSubject<boolean>(false);
  public cargando = this.$cargando.asObservable();
  constructor(
    private http: HttpClient
  ) { }

  obtenerProductos(){
    // Aquí se inicia la peticion
    this.$cargando.next(true);
    this.http.get<ResultadoAPI>(this.URL_PRODUCTOS)
    .pipe(delay(2000)) // Esperamos dos segundos 
    .subscribe(losDatosDeLaAPI => {
      console.log("Respuesta de la API");
      this.$productos.next(losDatosDeLaAPI);
      console.log(losDatosDeLaAPI);
      // Aquí termina el cargando
      this.$cargando.next(false);
    });

  }

  obtenerProductos30Siguientes(){
    this.$cargando.next(true);
    this.http.get<ResultadoAPI>(this.URL_PRODUCTOS+"?skip=30&limit=30")
    .pipe(delay(2000)) // Esperamos dos segundos 
    .subscribe(losDatosDeLaAPI => {
      console.log("Respuesta de la API");
      this.$productos.next(losDatosDeLaAPI);
      console.log(losDatosDeLaAPI);
      this.$cargando.next(false);
    });

  }

  public getProducts(page: number = 1, limit: number = 30) {
    const token = localStorage.getItem('accessToken');
  
    return fetch(`https://dummyjson.com/auth/products?limit=${limit}&skip=${(page - 1) * limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }
      return res.json();
    })
    .then(data => {
      return {
        products: data.products,
        total: data.total // Total de productos
      };
    });
  }
  

}
