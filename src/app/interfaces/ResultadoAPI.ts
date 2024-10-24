import { Producto } from "./Producto";

export interface ResultadoAPI {
    products: Producto[];
    total: number;
    skip: number;
    limit: number;
}