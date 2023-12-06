import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  categorychanged:EventEmitter<number> = new EventEmitter();

  constructor(private httpClient:HttpClient) { }

  productsurl:string = "https://localhost:7198/api/Product/GetByCategoryId";

  Products$ = (categoryId:number):Observable<Product[]> =>{
    let products = this.httpClient.get<Product[]>(this.productsurl+"/"+categoryId).pipe
    (
      tap((data)=>{return console.log(data);}),
      catchError(error=>{
        var httperror = <HttpErrorResponse>error;
        return throwError(()=>httperror);
      })
    );

    this.categorychanged.emit(categoryId);
    return products;
  }
}

