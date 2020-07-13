import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/index';
import {IProduct} from '../product/state/product.model';
import {ProductQuery} from '../product/state/product.query';
import {ProductService} from '../product/state/product.service';
import {FormControl} from '@angular/forms';
import {startWith, switchMap} from 'rxjs/internal/operators';
import {Order} from '@datorama/akita';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  products$ = this.productQuery.selectAll();
  isLoading$ = this.productQuery.selectLoading();
  sortBy = new FormControl('');
  sortOrder = new FormControl('asc');

  constructor(
    private productQuery: ProductQuery,
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    // get all products from api
    this.productService.get();
  }

  sort() {
    this.products$ = this.productQuery.selectAll({ sortBy: this.sortBy.value, sortByOrder: this.sortOrder.value});
  }
}
