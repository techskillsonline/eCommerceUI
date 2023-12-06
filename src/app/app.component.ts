import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';
import { Category } from './models/Category';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit,OnDestroy {
  /**
   *
   */
  categories:Category[] = [];
  categoriessubscription:Subscription | undefined;
  constructor(private categoryService:CategoryService) {
    
    
  }
  ngOnDestroy(): void {
    this.categoriessubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.categoriessubscription = this.categoryService.Categories$().subscribe(data=>{
      this.categories = data;
    })
  }
  title = 'ECommerce Application';
}

