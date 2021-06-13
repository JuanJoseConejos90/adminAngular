import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Product, responseProducts, response } from './../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }


  getAllproducts(): Observable<responseProducts> {
    return this.http.get<responseProducts>(`${environment.apiUrl}/products/getAllProducts`);
  }

  getById(id: number): Observable<responseProducts>  {
    return this.http.get<responseProducts>(`${environment.apiUrl}/products/getProductsById/${id}`);
  }

  createdProducts(formData: FormData) {
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
    return this.http.post<response>(`${environment.apiUrl}/products/createProduct`, formData, { 'headers': headers });
  }

  editProducts(formData: FormData) {
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
    return this.http.post<response>(`${environment.apiUrl}/products/updateProduct`, formData, { 'headers': headers });
  }


  deleteProduct(id: number) {
    return this.http.delete<response>(`${environment.apiUrl}/products/deleteProduct/${id}`);
  }


}
