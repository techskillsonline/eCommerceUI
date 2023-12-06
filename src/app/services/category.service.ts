import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Category } from '../models/Category';
import { Observable,tap,catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryurl:string = "https://localhost:7198/api/Category";


  constructor(private httpClient:HttpClient) 
  {

  }

  Categories$ = ():Observable<Category[]>=>{
    let categories = this.httpClient.get<Category[]>(this.categoryurl).pipe(
      tap(category=>console.log(category)),
        catchError(error=>
          {
            var httperror = <HttpErrorResponse>error;
            console.log(httperror);
            return throwError(()=>httperror);
        })
    );
    return categories;
  }
}

