import { Component, OnInit,OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit,OnDestroy {

  /**
   *
   */
  productslist$:Observable<Product[]>|undefined;
  categoryId:number|null = null;
  constructor(private productService:ProductService,private route:Router,private activatedRoute:ActivatedRoute) {
    
  }

  ngOnDestroy(): void {
    console.log("Destroyed");
  }

  ngOnInit(): void {
    console.log("ngOnInit()");   
    this.activatedRoute.queryParamMap.subscribe(i=>
      {
        this.categoryId = <number|null>i.get("categoryId");
        console.log(i.keys);
        if(this.categoryId)
        {
          console.log("in ngoninit");
          this.productslist$ = this.productService.Products$(this.categoryId);
        } 
      });
  }
}


