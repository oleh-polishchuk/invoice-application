import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { Product } from '../product/product';
import { HttpService } from "./http.service";

@Injectable()
export class ProductService extends HttpService {

  private productsUrl = 'api/products';  // URL to web api

  constructor(private http: HttpClient) {
    super();
  }

  /** GET products from the server */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(products => this.log(`fetched products`)),
        catchError(this.handleError('getProducts', []))
      );
  }

  /** GET product by id. Will 404 if id not found */
  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  /** POST product. Will 404 if id not found */
  saveProduct(product: Product) {
    return this.http.post<Product>(this.productsUrl, product, this.httpOptions).pipe(
      tap(_ => this.log(`save product name=${product.name}`)),
      catchError(this.handleError<Product>(`saveProduct name=${product.name}`))
    );
  }

  /** PUT product by id. Will 404 if id not found */
  updateProduct(product: Product) {
    const url = `${this.productsUrl}/${product.id}`;
    return this.http.put<Product>(url, product, this.httpOptions).pipe(
      tap(_ => this.log(`updated product id=${product.id}`)),
      catchError(this.handleError<Product>(`updateProduct id=${product.id}`))
    );
  }

  /** DELETE product by id. Will 404 if id not found */
  deleteProduct(id: number) {
    if (!id) {
      throw `Cannot delete product with id: ${id}`;
    }

    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<Product>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>(`deleteProduct id=${id}`))
    );
  }

}
